import { useState, useEffect, useCallback } from 'react'
import { PLAYERS } from '../../config'
import { GameLayout } from './GameLayout'
import store from '../../../../store'
import {
	randomInRange,
	getRandomEmptyIndex,
	getMissingIndexToWin
} from '../../helpers'
import {
	makeStep,
	setLoading,
	setGameField,
	setAiOpponent,
	setDirtyState,
	changeDrawState,
	setCurrentPlayer,
	setGameOverState,
	setActiveWinPattern
} from '../../config/store'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

export const GameContainer = () => {
	const [currentPlayerId, setCurrentPlayerId] = useState(
		store.getState().ticTacToeReducer.currentPlayer
	)

	const restartGame = () => {
		store.dispatch(setGameOverState(false))
		store.dispatch(changeDrawState(false))
		store.dispatch(setLoading(false))
		store.dispatch(setAiOpponent(true))
		store.dispatch(setGameField())
		store.dispatch(setDirtyState(false))
		store.dispatch(setActiveWinPattern(null))
		store.dispatch(setCurrentPlayer())
	}

	const makeAiStep = useCallback(async () => {
		const { isFieldDirty, isAiOpponent, currentPlayer, field } =
			store.getState().ticTacToeReducer

		if (
			isFieldDirty &&
			isAiOpponent &&
			currentPlayer === PLAYERS.PLAYER_2.id
		) {
			// — — Imitation of thinking delay — —
			const randomThinkTime = randomInRange(64, 768)
			store.dispatch(setLoading(true))
			await new Promise(r => setTimeout(() => r(), randomThinkTime))
			store.dispatch(setLoading(false))
			// — — End of imitation — —

			let targetIndex = null
			const aiToWinIndex = getMissingIndexToWin(field, currentPlayer)

			if (Number.isInteger(aiToWinIndex)) {
				targetIndex = aiToWinIndex
			} else {
				targetIndex =
					getMissingIndexToWin(field, PLAYERS.PLAYER_1.id) ??
					getRandomEmptyIndex(field)
			}

			store.dispatch(makeStep(targetIndex))
		}
	}, [])

	useEffect(() => {
		makeAiStep(currentPlayerId)
	}, [currentPlayerId, makeAiStep])

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setCurrentPlayerId(store.getState().ticTacToeReducer.currentPlayer)
		})
		return () => unsubscribe()
	}, [])

	return <GameLayout restartGame={restartGame} />
}
