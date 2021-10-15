import { createAction } from '@reduxjs/toolkit'

export const userFetching = createAction('user/fetching')
export const userResolved = createAction('user/resolved')
export const userRejected = createAction('user/rejected')

export const userInputAction = createAction(
	'user/input',
	({ firstName, lastName }) => {
		return { payload: { firstName, lastName } }
	}
)
