import { createStore } from 'redux'
import produce from 'immer'

const initialState = {
	isLoggedIn: false,
	token: undefined,
	userInfos: {
		email: undefined,
		firstName: undefined,
		lastName: undefined,
		createdAt: undefined,
		updatedAt: undefined,
		id: undefined,
	},
}

function reducer(state = initialState, action) {
	if (action.type === 'setLoggedIn') {
		return produce(state, (draft) => {
			draft.isLoggedIn = action.payload.isLoggedIn
			draft.token = action.payload.token
		})
	}
	if (action.type === 'setUserInfos') {
		return produce(state, (draft) => {
			draft.userInfos = action.payload
		})
	}
	return state
}

export const store = createStore(reducer)

store.subscribe(() => {
	console.log('Nouveau state:')
	console.log(store.getState())
})
