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
			return data
		} catch (error) {
			console.error('Unable to get user token', error)
		}
	}

	async renameUser(firstname, lastname, token) {
		const request = linkToBackend + 'user/profile'
		const body = {
			fistname: firstname,
			lastname: lastname,
		}

		try {
			const response = await fetch(request, {
				method: 'PUT',
				body: JSON.stringify(body),
				headers: {
					Authorization: 'Bearer ' + token, // ??? Backend -> tokenValidation.js l.12
					'Content-type': 'application/json',
				},
			})
			const data = await response.json()
			return data
		} catch (error) {
			console.error('Unable to rename user', error)
		}
	}
}
