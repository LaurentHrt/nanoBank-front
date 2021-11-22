import { createSlice } from '@reduxjs/toolkit'
import { UserService } from '../../utils/service/user.service'
import { logout, selectToken } from '../authentication/authentication'
import { fetchOrUpdateUserInfos, selectUserInfos } from '../user/user'

const initialState = {
	status: 'void',
	APIResponse: {},
	error: null,
}

export const selectRenameStatus = (state) => state.renameUser.status

export function renameUser(firstName, lastName) {
	return async (dispatch, getState) => {
		const userService = new UserService()
		const status = selectRenameStatus(getState())
		const token = selectToken(getState())
		const userInfos = selectUserInfos(getState())

		console.log('renaeUser')
		console.log(status)
		console.log('userInfo', userInfos.firstName)
		console.log('userInput', firstName)

		if (status === 'pending' || status === 'updating') {
			return
		}

		if (
			userInfos.firstName === firstName &&
			userInfos.lastName === lastName
		) {
			return
		}

		try {
			const response = await userService.renameUser(
				firstName,
				lastName,
				token
			)
			dispatch(actions.fetching())
			if (response.status === 200) {
				dispatch(actions.resolved(response.body))
				dispatch(fetchOrUpdateUserInfos)
			} else throw new Error(response.message)
		} catch (error) {
			dispatch(actions.rejected(error.message))
			dispatch(logout())
		}
	}
}

const { actions, reducer } = createSlice({
	name: 'renameUser',
	initialState,
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
				draft.APIResponse = action.payload
				draft.status = 'resolved'
				return
			}
			return
		},
		rejected: (draft, action) => {
			if ((draft.status = 'pending' || draft.status === 'updating')) {
				draft.error = action.payload
				draft.status = 'rejected'
				return
			}
			return
		},
	},
})

export default reducer
