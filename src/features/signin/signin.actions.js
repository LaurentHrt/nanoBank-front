export const FETCHING = 'login/attempt'
export const LOGOUT = 'login/logout'
export const RESOLVED = 'login/success'
export const REJECTED = 'login/rejected'

export const loginAttempt = (username, password) => ({
	type: FETCHING,
	payload: { username, password },
})

export const logout = () => ({
	type: LOGOUT,
})

export const loginSucess = (token) => ({
	type: RESOLVED,
	payload: token,
})

export const loginRejected = (errorMessage) => ({
	type: REJECTED,
	payload: errorMessage,
})
