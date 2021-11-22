import { createSlice } from '@reduxjs/toolkit'
import { UserService } from '../../utils/service/user.service'

const initialState = {
	status: 'void',
	token: null,
	error: null,
}

const sessionState = JSON.parse(sessionStorage.getItem('authState'))

export const selectStatus = (state) => state.authentication.status
export const selectToken = (state) => state.authentication.token
export const selectError = (state) => state.authentication.error

export function fetchorUpdateUserToken(username, password) {
	return async (dispatch, getState) => {
		const userService = new UserService()
		const status = selectStatus(getState())
		if (status === 'pending' || status === 'updating') {
			return
		}
		try {
			dispatch(actions.fetching())
			const response = await userService.getUserToken(username, password)
			if (response.status === 200)
				dispatch(actions.resolved(response.body.token))
			else if (response.status === 400)
				dispatch(actions.rejected(response.message))
			else throw new Error()
		} catch (error) {
			console.error('Error:', error)
			dispatch(actions.rejected('Unable to reach server'))
		}
	}
}

const { actions, reducer } = createSlice({
	name: 'authentication',
	initialState: sessionState || initialState,
	reducers: {
		fetching: {
			prepare: (username, password) => {
				return { payload: { username, password } }
			},
			reducer: (draft) => {
				if (draft.status === 'void') {
					draft.status = 'pending'
					return
				}
				if (draft.status === 'rejected') {
					draft.error = null
					draft.status = 'pending'
					return
				}
				if (draft.status === 'resolved') {
					draft.status = 'updating'
					return
				}
				return
			},
		},
		logout: () => {
			sessionStorage.clear()
			return initialState
		},
		resolved: {
			prepare: (token) => {
				return { payload: token }
			},
			reducer: (draft, action) => {
				if (draft.status === 'pending' || draft.status === 'updating') {
					draft.token = action.payload
					draft.status = 'resolved'
					return
				}
				return
			},
		},
		rejected: {
			prepare: (errorMessage) => {
				return { payload: errorMessage }
			},
			reducer: (draft, action) => {
				if ((draft.status = 'pending' || draft.status === 'updating')) {
					draft.error = action.payload
					draft.token = null
					draft.status = 'rejected'
					return
				}
				return
			},
		},
	},
})

export const { logout } = actions

export default reducer
