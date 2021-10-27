import { createSlice } from '@reduxjs/toolkit'
import { UserService } from '../../utils/service/user.service'
import { logout, selectToken } from '../authentication/authentication'

const initialState = {
	status: 'void',
	data: {},
	error: null,
}

export const selectUser = (state) => state.user
export const selectUserStatus = (state) => state.user.status
export const selectUserInfos = (state) => state.user.data
export const selectUserInput = (state) => state.user.input
export const selectUserFirstname = (state) => state.user.data.firstName
export const selectUserLastname = (state) => state.user.data.lastName

export async function fetchOrUpdateUserInfos(dispatch, getState) {
	const userService = new UserService()
	const status = selectUserStatus(getState())
	const token = selectToken(getState())

	if (status === 'pending' || status === 'updating') {
		return
	}

	try {
		dispatch(actions.fetching())

		const response = await userService.getUserInfos(token)

		if (response.status === 200) {
			dispatch(actions.resolved(response.body))
		} else throw new Error(response.message)
	} catch (error) {
		dispatch(actions.rejected(error.message))
		dispatch(logout())
	}
}

const { actions, reducer } = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		fetching: (draft) => {
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
		resolved: (draft, action) => {
			if (draft.status === 'pending' || draft.status === 'updating') {
				draft.data = action.payload
				draft.status = 'resolved'
				return
			}
			return
		},
		rejected: (draft, action) => {
			if ((draft.status = 'pending' || draft.status === 'updating')) {
				draft.error = action.payload
				draft.data = {}
				draft.status = 'rejected'
				return
			}
			return
		},
	},
})

export default reducer
