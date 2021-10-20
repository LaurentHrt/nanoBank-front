import {
	userFetching,
	userResolved,
	userRejected,
	userInputAction,
} from './user.actions'
import { UserService } from '../../utils/service/user.service'
import { selectUser, selectUserInfos, selectUserInput } from './user.selector'
import { selectToken } from '../authentication/authentication'
import { createReducer } from '@reduxjs/toolkit'

const initialState = {
	status: 'void',
	data: {
		email: null,
		firstName: null,
		lastName: null,
		createdAt: null,
		updatedAt: null,
		id: null,
	},
	input: {
		firstName: null,
		lastName: null,
	},
	error: null,
}

export async function fetchOrUpdateUserInfos(dispatch, getState) {
	const userService = new UserService()
	const status = selectUser(getState()).status
	const token = selectToken(getState())
	const userInfos = selectUserInfos(getState())
	const userInput = selectUserInput(getState())

	if (status === 'pending' || status === 'updating') {
		return
	}

	try {
		let response
		if (
			userInfos.firstName !== userInput.firstName ||
			userInfos.lastName !== userInput.lastName
		) {
			response = await userService.renameUser(
				userInput.firstName,
				userInput.lastName,
				token
			)
		} else {
			response = await userService.getUserInfos(token)
		}
		dispatch(userFetching())
		if (response.status === 200) {
			dispatch(userResolved(response.body))
		} else throw new Error(response.message)
	} catch (error) {
		dispatch(userRejected(error.message))
	}
}

export default createReducer(initialState, (builder) => {
	return builder
		.addCase(userFetching, (draft) => {
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
		.addCase(userInputAction, (draft, action) => {
			draft.input.firstName = action.payload.firstName
			draft.input.lastName = action.payload.lastName
		})
		.addCase(userResolved, (draft, action) => {
			if (draft.status === 'pending' || draft.status === 'updating') {
				draft.data = action.payload
				draft.input = action.payload
				draft.status = 'resolved'
				return
			}
			return
		})
		.addCase(userRejected, (draft, action) => {
			if ((draft.status = 'pending' || draft.status === 'updating')) {
				draft.error = action.payload
				draft.data = null
				draft.status = 'rejected'
				return
			}
			return
		})
})
