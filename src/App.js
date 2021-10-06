import { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home } from './page/Home/Home'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Signin } from './page/Signin/Signin'
import { User } from './page/User/User'
import { E404 } from './page/E404/E404'

function App() {
	return (
		<Fragment>
			<Header />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/sign-in">
					<Signin />
				</Route>
				<Route path="/user/:id">
					<User />
				</Route>
				<Route path="*">
					<E404 />
				</Route>
			</Switch>

			<Footer />
		</Fragment>
	)
}

export default App
