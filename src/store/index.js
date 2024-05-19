import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ticTacToeReducer from '../modules/TicTacToe/config/store'

const rootReducer = combineReducers({
	ticTacToeReducer
})

const store = configureStore({
	reducer: rootReducer
})

export default store
