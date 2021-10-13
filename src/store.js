import { createStore } from 'redux'
import produce from 'immer'
import { UserService } from './utils/service/user.service'

const initialState = {
	loginPage: {
		emailError: null,
		passwordError: null,
	},
	bankAccounts: [],
	userInfos: {
		token: undefined,
		email: undefined,
		firstName: undefined,
		lastName: undefined,
		createdAt: undefined,
		updatedAt: undefined,
		id: undefined,
		rememberMe: false,
	},

	// isLoggedIn: false,
	// token: null,
	// userInfos: {
	// 	email: undefined,
	// 	firstName: undefined,
	// 	lastName: undefined,
	// 	createdAt: undefined,
	// 	updatedAt: undefined,
	// 	id: undefined,
	// },
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case 'login':
			// TODO call api
			UserService.getUserToken(
				action.payload.username,
				action.payload.password
			)
				.then((response) => {
					action.asyncDispatch(login())
				})
				.catch((error) => {})
			const token = response.body?.token
			if (token) {
			} else {
				window.alert(response.message)
			}
			break
		case 'loginSucess':
			// TODO update state with token
			break
		case 'loginFailure':
			// TODO
			break

		default:
			break
	}

	// if (action.type === 'setLoggedIn') {
	// 	return produce(state, (draft) => {
	// 		draft.isLoggedIn = action.payload.isLoggedIn
	// 		draft.token = action.payload.token
	// 		draft.userInfos = {}
	// 	})
	// }
	// if (action.type === 'setUserInfos') {
	// 	return produce(state, (draft) => {
	// 		draft.userInfos = action.payload
	// 	})
	// }

	return state
}

export const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
	console.log('Nouveau state:')
	console.log(store.getState())
})
