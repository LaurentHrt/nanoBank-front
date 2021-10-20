import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/user'
import authenticationReducer from './features/authentication/authentication'

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		user: userReducer,
	},
})
