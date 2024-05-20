import { createSlice } from '@reduxjs/toolkit'
import { initialState, WIN_PATTERNS, FIELD_SIZE, PLAYERS } from './'

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
		},
		setActiveWinPattern: (state, action) => {
			state.activeWinPattern = action.payload
		},
		setCurrentPlayer: (state, action) => {
			state.currentPlayer = action.payload ?? PLAYERS.PLAYER_1.id
		},
		setDirtyState: (state, action) => {
			state.isFieldDirty = action.payload ?? !state.isFieldDirty
		},
		setAiOpponent: (state, action) => {
			state.isAiOpponent = action.payload ?? !state.isAiOpponent
		},
		makeStep: (state, action) => {
			const i = action.payload

			if (
				!!state.isGameOver ||
				!!Number.isInteger(Array.from(state.field)[i])
			)
				return

			const updatedField = state.field.toSpliced(
				i,
				1,
				state.currentPlayer
			)

			state.field = updatedField

			state.isFieldDirty = true

			const currentUserFilledLength = updatedField.filter(
				cell => cell === state.currentPlayer
			)?.length

			let hasWinner = false

			if (currentUserFilledLength >= 3) {
				let i = 0

				while (!hasWinner) {
					hasWinner = WIN_PATTERNS[i].every(
						ndx => updatedField[ndx] === state.currentPlayer
					)

					if (hasWinner) state.activeWinPattern = WIN_PATTERNS[i]

					if (hasWinner || i === WIN_PATTERNS.length - 1) {
						break
					} else {
						i++
					}
				}
			}

			const fieldIsFilled =
				updatedField.filter(cell => Number.isInteger(cell)).length ===
				FIELD_SIZE

			if (hasWinner) {
				// WIN

				state.isGameOver = true
			} else if (fieldIsFilled) {
				// DRAW
				state.isGameOver = true
				state.isDraw = true
				state.isLoading = true
				return
			} else {
				// NEXT
				const { PLAYER_1, PLAYER_2 } = PLAYERS

				state.currentPlayer =
					state.currentPlayer === PLAYER_1.id
						? PLAYER_2.id
						: PLAYER_1.id
			}

			state.isLoading = false
		}
	}
})

export const {
	makeStep,
	setLoading,
	setGameField,
	setDirtyState,
	setAiOpponent,
	changeDrawState,
	setCurrentPlayer,
	setGameOverState,
	setActiveWinPattern
} = ticTacToeSlice.actions
export default ticTacToeSlice.reducer
