import { createAction } from '@reduxjs/toolkit'

export const loginFetching = createAction(
	'login/fetching',
	(username, password) => {
		return { payload: { username, password } }
	}
)

export const logout = createAction('logout')

export const loginResolved = createAction('login/resolved', (token) => {
	return { payload: token }
})

export const loginRejected = createAction('login/rejected', (errorMessage) => {
	return { payload: errorMessage }
})
