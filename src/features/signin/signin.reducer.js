import { selectSignin } from './signin.selectors'
import {
	loginAttempt,
	loginResolved,
	loginRejected,
	logout,
} from './signin.actions'
import { UserService } from '../../utils/service/user.service'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	status: 'void',
	token: null,
	error: null,
}

export function fetchorUpdateUserToken(username, password) {
	return async (dispatch, getState) => {
		const userService = new UserService()
		const status = selectSignin(getState()).status
		if (status === 'pending' || status === 'updating') {
			return
		}
		try {
			dispatch(loginAttempt())
			const response = await userService.getUserToken(username, password)
			if (response.status === 200)
				dispatch(loginResolved(response.body.token))
			else throw new Error(response.message)
		} catch (error) {
			dispatch(loginRejected(error.message))
		}
	}
}

export default createReducer(initialState, (builder) => {
	return builder
		.addCase(loginAttempt, (draft) => {
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
		})
		.addCase(logout, () => initialState)
		.addCase(loginResolved, (draft, action) => {
			if (draft.status === 'pending' || draft.status === 'updating') {
				draft.token = action.payload
				draft.status = 'resolved'
				return
			}
			return
		})
		.addCase(loginRejected, (draft, action) => {
			if ((draft.status = 'pending' || draft.status === 'updating')) {
				draft.error = action.payload
				draft.token = null
				draft.status = 'rejected'
				return
			}
			return
		})
})
