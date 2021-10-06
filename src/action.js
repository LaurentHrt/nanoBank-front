// Action creators

export const setLoggedIn = (isLoggedIn, token = null) => ({
	type: 'setLoggedIn',
	payload: { isLoggedIn: isLoggedIn, token: token },
})
