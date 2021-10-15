import { createAction } from '@reduxjs/toolkit'

export const loginAttempt = createAction(
	'login/attempt',
	(username, password) => {
		return { payload: { username, password } }
	}
)

export const logout = createAction('login/logout')

export const loginResolved = createAction('login/success', (token) => {
	return { payload: token }
})

export const loginRejected = createAction('login/rejected', (errorMessage) => {
	return { payload: errorMessage }
})
