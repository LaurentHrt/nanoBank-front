const linkToBackend = `http://${process.env.REACT_APP_API}:${process.env.REACT_APP_PORT}/api/v1/`

export class UserService {
	async getUserToken(username, password) {
		const request = linkToBackend + 'user/login'
		const body = {
			email: username,
			password: password,
		}

		try {
			const response = await fetch(request, {
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-type': 'application/json',
				},
			})
			const data = await response.json()
			return data.body?.token
		} catch (error) {
			console.error('Unable to get user token', error)
		}
	}
}
