import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router'
import { fetchorUpdateUserToken } from '../../features/authentication/authentication'
import {
	selectError,
	selectToken,
	selectStatus,
} from '../../features/authentication/authentication'

export function Signin() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const isLoggedIn = useSelector(selectToken) != null
	const status = useSelector(selectStatus)
	const dispatch = useDispatch()

	const errorMessage = useSelector(selectError)

	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch(fetchorUpdateUserToken(username, password))
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
					{status === 'pending' && <div className="loader"></div>}
					{status === 'rejected' && (
						<div className="errorMessage">{errorMessage}</div>
					)}
					<button className="sign-in-button">Sign In</button>
				</form>
			</section>
		</main>
	)

	return isLoggedIn ? <Redirect exact to={`user`} /> : form
}
