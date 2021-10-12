import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { Signin } from './pages/Signin/Signin'
import { User } from './pages/User/User'
import { E404 } from './pages/E404/E404'
import { Footer } from './components/Footer/Footer'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
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
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
