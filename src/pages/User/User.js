import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import AccountList from '../../components/AccountList/AccountList'
import UserHeader from '../../components/UserHeader/UserHeader'
import { selectIsLoggedIn } from '../../selector'

export function User() {
	const isLoggedIn = useSelector(selectIsLoggedIn)

	const page = (
		<main className="main bg-dark">
			<UserHeader />
			<AccountList />
		</main>
	)

	return isLoggedIn ? page : <Redirect exact to={`sign-in`} />
}
