// DEPRECATED below
import { legacy_createStore } from 'redux'
import { ticTacToeReducer } from '../modules/TicTacToe/config/store'

let store = legacy_createStore(ticTacToeReducer)
export default store
