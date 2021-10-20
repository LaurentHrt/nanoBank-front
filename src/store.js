import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/user.reducer'
import reducer from './features/authentication/authentication'

export const store = configureStore({
	reducer: {
		signin: reducer,
		user: userReducer,
	},
})
