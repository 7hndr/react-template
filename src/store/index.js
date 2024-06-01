import {
	combineReducers,
	legacy_createStore,
	applyMiddleware,
	compose
} from 'redux'
import { ticTacToeReducer } from '../modules/TicTacToe/config/store'
import { thunk } from 'redux-thunk'

const reducer = combineReducers({
	ticTacToe: ticTacToeReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default legacy_createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
)
