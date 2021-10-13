import { produce } from 'immer'
import { selectSignin } from './signin.selectors'
import {
	loginAttempt,
	loginRejected,
	loginSucess,
	FETCHING,
	REJECTED,
	RESOLVED,
	LOGOUT,
} from './signin.actions'
import { UserService } from '../../utils/service/user.service'

const initialState = {
	status: 'void',
	token: null,
	error: null,
}

export async function fetchorUpdateUserToken(store, username, password) {
	const userService = new UserService()
	const status = selectSignin(store.getState()).status
	if (status === 'pending' || status === 'updating') {
		return
	}
	try {
		store.dispatch(loginAttempt())
		const response = await userService.getUserToken(username, password)
		if (response.status === 200)
			store.dispatch(loginSucess(response.body.token))
		else throw new Error(response.message)
	} catch (error) {
		store.dispatch(loginRejected(error.message))
	}
}

export default function signinReducer(state = initialState, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case FETCHING: {
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
			}
			case LOGOUT: {
				return initialState
			}
			case RESOLVED: {
				if (draft.status === 'pending' || draft.status === 'updating') {
					draft.token = action.payload
					draft.status = 'resolved'
					return
				}
				return
			}
			case REJECTED: {
				if ((draft.status = 'pending' || draft.status === 'updating')) {
					draft.error = action.payload
					draft.token = null
					draft.status = 'rejected'
					return
				}
				return
			}

			default:
				return
		}
	})
}
