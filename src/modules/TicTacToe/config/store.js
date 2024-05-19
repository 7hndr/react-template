import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './'

const ticTacToeSlice = createSlice({
	name: 'ticTacToe',
	initialState,
	reducers: {
		changeDrawState: (state, action) => {
			state.isDraw = action.payload ?? !state.isDraw
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload ?? !state.isLoading
		},
		setGameOverState: (state, action) => {
			state.isGameOver = action.payload ?? !state.isGameOver
		},
		setGameField: (state, action) => {
			state.field = action.payload ?? initialState.field
		}
	}
})

export const { changeDrawState, setLoading, setGameField, setGameOverState } =
	ticTacToeSlice.actions
export default ticTacToeSlice.reducer
