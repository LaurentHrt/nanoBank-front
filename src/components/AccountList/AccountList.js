import { Fragment } from 'react'
import Account from '../Account/Account'

export default function AccountList() {
	return (
		<Fragment>
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
		</Fragment>
	)
}
