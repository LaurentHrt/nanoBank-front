import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/user'
import renameUserReducer from './features/renameUser/renameUser'
import authenticationReducer from './features/authentication/authentication'

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		user: userReducer,
		renameUser: renameUserReducer,
	},
})

store.subscribe(() => {
	sessionStorage.setItem(
		'authState',
		JSON.stringify(store.getState().authentication)
	)
})
