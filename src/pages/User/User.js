import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import AccountList from '../../components/AccountList/AccountList'
import UserHeader from '../../components/UserHeader/UserHeader'
import { selectToken } from '../../features/authentication/authentication'

export function User() {
	const isLoggedIn = useSelector(selectToken) != null

	const page = (
		<main className="main bg-dark">
			<UserHeader />
			<AccountList />
		</main>
	)

	return isLoggedIn ? page : <Redirect exact to={`sign-in`} />
}
