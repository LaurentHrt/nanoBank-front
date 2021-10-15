import { configureStore } from '@reduxjs/toolkit'
import signinReducer from './features/signin/signin.reducer'
import userReducer from './features/user/user.reducer'

export const store = configureStore({
	reducer: {
		signin: signinReducer,
		user: userReducer,
	},
})
