import { produce } from 'immer'
import {
	FETCHING,
	RESOLVED,
	REJECTED,
	userFetching,
	userResolved,
	userRejected,
} from './user.actions'
import { UserService } from '../../utils/service/user.service'
import { selectUser } from './user.selector'
import { selectToken } from '../signin/signin.selectors'

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
	error: null,
}

export async function fetchOrUpdateUserInfos(store) {
	const userService = new UserService()
	const status = selectUser(store.getState()).status
	const token = selectToken(store.getState())
	if (status === 'pending' || status === 'updating') {
		return
	}
	try {
		store.dispatch(userFetching())
		const response = await userService.getUserInfos(token)
		if (response.status === 200) {
			store.dispatch(userResolved(response.body))
		} else throw new Error(response.message)
	} catch (error) {
		store.dispatch(userRejected(error.message))
	}
}

export default function userReducer(state = initialState, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case FETCHING:
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
			case RESOLVED:
				if (draft.status === 'pending' || draft.status === 'updating') {
					draft.data = action.payload
					draft.status = 'resolved'
					return
				}
				return
			case REJECTED:
				if ((draft.status = 'pending' || draft.status === 'updating')) {
					draft.error = action.payload
					draft.data = null
					draft.status = 'rejected'
					return
				}
				return

			default:
				return
		}
	})
}
