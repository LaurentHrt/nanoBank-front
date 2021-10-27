const linkToBackend = `http://${process.env.REACT_APP_API}:${process.env.REACT_APP_PORT}/api/v1/`

export class UserService {
	async getUserToken(username, password) {
		const request = linkToBackend + 'user/login'
		const headers = {
			'Content-type': 'application/json',
		}
		const body = JSON.stringify({
			email: username,
			password: password,
		})

		try {
			const response = await fetch(request, {
				method: 'POST',
				headers: headers,
				body: body,
			})
			const data = await response.json()
			return data
		} catch (error) {
			console.error('Unable to reach server', error)
		}
	}

	async getUserInfos(token) {
		const request = linkToBackend + 'user/profile'
		const headers = {
			Authorization: 'Bearer ' + token,
			'Content-type': 'application/json',
		}

		try {
			const response = await fetch(request, {
				method: 'POST',
				headers: headers,
			})
			const data = await response.json()
			return data
		} catch (error) {
			console.error('Unable to reach server', error)
		}
	}

	async renameUser(firstName, lastName, token) {
		const request = linkToBackend + 'user/profile'
		const headers = {
			Authorization: 'Bearer ' + token,
			'Content-type': 'application/json',
		}
		const body = JSON.stringify({
			firstName: firstName,
			lastName: lastName,
		})

		try {
			const response = await fetch(request, {
				method: 'PUT',
				headers: headers,
				body: body,
			})
			const data = await response.json()
			console.log(data)
			return data
		} catch (error) {
			console.error('Unable to reach server', error)
		}
	}
}
