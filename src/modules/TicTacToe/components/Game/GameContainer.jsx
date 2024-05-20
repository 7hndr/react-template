import { useState, useEffect, useCallback } from 'react'
import { PLAYERS } from '../../config'
import { GameLayout } from './GameLayout'
import store from '../../../../store'
import {
	randomInRange,
	getRandomEmptyIndex,
	getMissingIndexToWin
} from '../../helpers'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

export const GameContainer = () => {
	const [currentPlayerId, setCurrentPlayerId] = useState(
		store.getState().currentPlayer
	)

	const restartGame = () => {
		store.dispatch({ type: 'setGameOverState', payload: false })
		store.dispatch({ type: 'changeDrawState', payload: false })
		store.dispatch({ type: 'setLoading', payload: false })
		store.dispatch({ type: 'setAiOpponent', payload: true })
		store.dispatch({ type: 'setGameField' })
		store.dispatch({ type: 'setDirtyState', payload: false })
		store.dispatch({ type: 'setActiveWinPattern', payload: null })
		store.dispatch({ type: 'setCurrentPlayer' })
	}

	const makeAiStep = useCallback(async () => {
		const { isFieldDirty, isAiOpponent, currentPlayer, field } =
			store.getState()

		if (
			isFieldDirty &&
			isAiOpponent &&
			currentPlayer === PLAYERS.PLAYER_2.id
		) {
			// — — Imitation of thinking delay — —
			const randomThinkTime = randomInRange(64, 768)
			store.dispatch({ type: 'setLoading', payload: true })
			await new Promise(r => setTimeout(() => r(), randomThinkTime))
			store.dispatch({ type: 'setLoading', payload: false })
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

			store.dispatch({ type: 'makeStep', payload: targetIndex })
		}
	}, [])

	useEffect(() => {
		makeAiStep(currentPlayerId)
	}, [currentPlayerId, makeAiStep])

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setCurrentPlayerId(store.getState().currentPlayer)
		})
		return () => unsubscribe()
	}, [])

	return <GameLayout restartGame={restartGame} />
}
