import {
	randomInRange,
	getRandomEmptyIndex,
	getMissingIndexToWin
} from '../helpers'
import { PLAYERS } from '../config'

export const changeDrawState = payload => ({
	type: 'changeDrawState',
	payload
})

export const setAiOpponent = payload => ({
	type: 'setAiOpponent',
	payload
})

export const setDirtyState = payload => ({
	type: 'setDirtyState',
	payload
})

export const setLoading = payload => ({
	type: 'setLoading',
	payload
})

export const setGameOverState = payload => ({
	type: 'setGameOverState',
	payload
})

export const setGameField = payload => ({
	type: 'setGameField',
	payload
})

export const setActiveWinPattern = payload => ({
	type: 'setActiveWinPattern',
	payload
})

export const setCurrentPlayer = payload => ({
	type: 'setCurrentPlayer',
	payload
})

export const makeStep = payload => ({
	type: 'makeStep',
	payload
})

// async
export const makeAiStep = () => async (dispatch, getState) => {
	const state = getState().ticTacToe

	if (
		state.isFieldDirty &&
		state.isAiOpponent &&
		state.currentPlayer === PLAYERS.PLAYER_2.id
	) {
		// — — Imitation of AI thinking delay — —
		dispatch(setLoading(true))
		await new Promise(r => setTimeout(r, randomInRange(64, 768)))
		dispatch(setLoading(false))
		// — — End of imitation — —

		let targetIndex = null
		const aiToWinIndex = getMissingIndexToWin(
			state.field,
			state.currentPlayer
		)

		if (Number.isInteger(aiToWinIndex)) {
			targetIndex = aiToWinIndex
		} else {
			targetIndex =
				getMissingIndexToWin(state.field, PLAYERS.PLAYER_1.id) ??
				getRandomEmptyIndex(state.field)
		}

		return dispatch(makeStep(targetIndex))
	}
}
