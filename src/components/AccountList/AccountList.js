import { Fragment } from 'react'
import { accounts } from '../../data/accounts'
import Account from '../Account/Account'

export default function AccountList() {
	return (
		<Fragment>
			<h2 className="sr-only">Accounts</h2>
			{accounts.map(({ name, amount, description }) => (
				<Account
					key={name}
					name={name}
					amount={amount}
					description={description}
				/>
			))}
		</Fragment>
	)
}
