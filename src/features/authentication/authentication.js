import { createSlice } from '@reduxjs/toolkit'
import { UserService } from '../../utils/service/user.service'

const initialState = {
	status: 'void',
	token: null,
	error: null,
}

export const selectSignin = (state) => state.signin
export const selectStatus = (state) => state.signin.status
export const selectToken = (state) => state.signin.token
export const selectError = (state) => state.signin.error

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
			else throw new Error(response.message)
		} catch (error) {
			dispatch(actions.rejected(error.message))
		}
	}
}

const { actions, reducer } = createSlice({
	name: 'authentication',
	initialState,
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
				if (draft.statut === 'resolved') {
					draft.status = 'updating'
					return
				}
				return
			},
		},
		logout: () => initialState,
		resolved: {
			prepare: (token) => {
				return { payload: token }
			},
			reducer: (draft, action) => {
				if (draft.status === 'pending' || draft.status === 'updating') {
					draft.token = action.payload
					draft.status = 'resolved'
					window.sessionStorage.setItem('token', action.payload)
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
