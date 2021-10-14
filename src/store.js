import { combineReducers, createStore } from 'redux'
import signinReducer from './features/signin/signin.reducer'
import userReducer from './features/user/user.reducer'

const reducer = combineReducers({
	signin: signinReducer,
	user: userReducer,
})

export const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
	console.log('Nouveau state:')
	console.log(store.getState())
})
