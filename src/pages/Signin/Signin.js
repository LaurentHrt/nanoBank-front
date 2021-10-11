import { useState } from 'react'
import { UserService } from '../../utils/service/user.service'
import { setLoggedIn } from '../../features/action'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'

export function Signin() {
	const userService = new UserService()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const isLoggedIn = useSelector((state) => state.isLoggedIn)

	const handleSubmit = async (e) => {
		e.preventDefault()
		const response = await userService.getUserToken(username, password)
		const token = response.body?.token
		if (token) {
			console.log('Token:', token)
			dispatch(setLoggedIn(true, token))
		} else {
			window.alert(response.message)
		}
	}

	const form = (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit}>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>

					<button className="sign-in-button">Sign In</button>
				</form>
			</section>
		</main>
	)

	return isLoggedIn ? <Redirect exact to={`user`} /> : form
}
