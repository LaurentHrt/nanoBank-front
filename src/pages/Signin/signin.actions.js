export const login = (username, password, rememberMe) => ({
	type: 'login',
	payload: { username, password, rememberMe },
})

export const loginSucess = (userInfos) => ({
	type: 'loginSucess',
	payload: userInfos,
})

export const loginFailure = (errorMessage) => ({
	type: 'loginFailure',
	payload: { errorMessage },
})
