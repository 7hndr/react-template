import { INITIAL_FIELD, WIN_PATTERNS, FIELD_SIZE, PLAYERS } from './'

const initialState = {
	isLoading: false,
	isDraw: false,
	isGameOver: false,
	isAiOpponent: true,
	isFieldDirty: false,
	field: INITIAL_FIELD,
	currentPlayer: PLAYERS.PLAYER_1.id,
	activeWinPattern: null
}

const makePlayerStep = (state, i) => {
	if (state.isGameOver || Number.isInteger(state.field[i])) return state

	const updatedField = state.field.toSpliced(i, 1, state.currentPlayer)

	const currentUserFilledLength = updatedField.filter(
		cell => cell === state.currentPlayer
	)?.length

	let hasWinner = false
	let activeWinPattern = null

	if (currentUserFilledLength >= 3) {
		let i = 0

		while (!hasWinner) {
			hasWinner = WIN_PATTERNS[i].every(
				ndx => updatedField[ndx] === state.currentPlayer
			)

			if (hasWinner) activeWinPattern = WIN_PATTERNS[i]

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

	return {
		...state,
		field: updatedField,
		isFieldDirty: true,
		currentPlayer:
			hasWinner || fieldIsFilled
				? state.currentPlayer
				: state.currentPlayer === PLAYERS.PLAYER_1.id
				? PLAYERS.PLAYER_2.id
				: PLAYERS.PLAYER_1.id,
		isGameOver: hasWinner || fieldIsFilled,
		activeWinPattern: hasWinner ? activeWinPattern : null,
		isDraw: fieldIsFilled && !hasWinner
	}
}

export const ticTacToeReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'changeDrawState':
			return { ...state, isDraw: payload ?? !state.isDraw }
		case 'setAiOpponent':
			return { ...state, isAiOpponent: payload ?? !state.isAiOpponent }
		case 'setDirtyState':
			return { ...state, isFieldDirty: payload ?? !state.isFieldDirty }
		case 'setLoading':
			return { ...state, isLoading: payload ?? !state.isLoading }
		case 'setGameOverState':
			return { ...state, isGameOver: payload ?? !state.isGameOver }
		case 'setGameField':
			return { ...state, field: payload ?? initialState.field }
		case 'setActiveWinPattern':
			return { ...state, activeWinPattern: payload }
		case 'setCurrentPlayer':
			return { ...state, currentPlayer: payload ?? PLAYERS.PLAYER_1.id }
		case 'makeStep':
			return makePlayerStep(state, payload)

		default:
			return state
	}
}
