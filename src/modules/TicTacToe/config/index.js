import { FaChrome, FaInternetExplorer } from 'react-icons/fa'

export const FIELD_SIZE = 9
export const INITIAL_FIELD = new Array(FIELD_SIZE).fill(null)
export const WIN_PATTERNS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

export const PLAYERS = {
	PLAYER_1: { id: 1, name: 'Chorme', icon: FaChrome },
	PLAYER_2: { id: 2, name: 'IE', icon: FaInternetExplorer }
}

export const initialState = {
	isLoading: false,
	isDraw: false,
	isGameOver: false,
	// isAiOpponent: true,
	// isFieldDirty: false,
	field: INITIAL_FIELD
	// currentPlayer: PLAYERS.PLAYER_1
}
