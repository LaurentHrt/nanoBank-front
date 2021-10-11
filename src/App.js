import { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Home } from './pages/Home/Home'
import { Signin } from './pages/Signin/Signin'
import { User } from './pages/User/User'
import { E404 } from './pages/E404/E404'

function App() {
	return (
		<Fragment>
			<Header />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/sign-in">
					<Signin />
				</Route>
				<Route exact path="/user">
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
