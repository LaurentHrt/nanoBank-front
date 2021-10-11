import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import Account from '../../components/Account/Account'
import UserHeader from '../../components/UserHeader/UserHeader'

export function User() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn)

	const page = (
		<main className="main bg-dark">
			<UserHeader />
			<h2 className="sr-only">Accounts</h2>
			<Account
				name="Argent Bank Checking (x8349)"
				amount="$2,082.79"
				description="Available Balance"
			/>
			<Account
				name="Argent Bank Savings (x6712)"
				amount="$10,928.42"
				description="Available Balance"
			/>
			<Account
				name="Argent Bank Credit Card (x8349)"
				amount="$184.30"
				description="Current Balance"
			/>
		</main>
	)

	return isLoggedIn ? page : <Redirect exact to={`sign-in`} />
}
