import { useState, useEffect, useCallback } from 'react'

import { FIELD_SIZE, WIN_PATTERNS, PLAYERS } from '../../config'
import { GameLayout } from './GameLayout'
import store from '../../../../store'
import {
	randomInRange,
	getEmptyIndexList,
	getRandomEmptyIndex
} from '../../helpers'
import {
	changeDrawState,
	setLoading,
	setGameField,
	setGameOverState
} from '../../config/store'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

const getMissingIndexToWin = (field, playerId) => {
	const emptyIndexList = getEmptyIndexList(field)

	let targetIndex = null
	let i = 0

	while (!Number.isInteger(targetIndex)) {
		const pattern = WIN_PATTERNS[i]

		let opponentMatchedIndexCount = 0
		const opponentNeededToWin = []

		pattern.forEach(i => {
			if (field[i] === playerId) {
				opponentMatchedIndexCount++
			} else {
				opponentNeededToWin.push(i)
			}
		})

		if (
			opponentMatchedIndexCount === 2 &&
			emptyIndexList.includes(opponentNeededToWin[0])
		) {
			targetIndex = opponentNeededToWin[0]
		} else if (i < WIN_PATTERNS.length - 1) {
			i++
		} else break
	}

	return targetIndex
}

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

export const GameContainer = () => {
	const [isDirty, setDirtyState] = useState(false)
	const [field, setField] = useState(store.getState().ticTacToeReducer.field)
	const [isAiOpponent, setAiOpponent] = useState(true)
	const [activeWinPattern, setActiveWinPattern] = useState(null)
	const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.PLAYER_1)

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	const restartGame = () => {
		store.dispatch(setGameOverState(false))
		store.dispatch(changeDrawState(false))
		store.dispatch(setLoading(false))
		setAiOpponent(true)
		setDirtyState(false)
		store.dispatch(setGameField())
		setActiveWinPattern(null)
		setCurrentPlayer(PLAYERS.PLAYER_1)
	}

	const cellClickHandler = useCallback(
		async (i, delay) => {
			if (delay) {
				store.dispatch(setLoading(true))
				await new Promise(r => setTimeout(() => r(), delay))
			}

			if (
				store.getState().ticTacToeReducer.isGameOver ||
				!!Number.isInteger(field[i])
			)
				return

			const updatedField = field.toSpliced(i, 1, currentPlayer.id)

			store.dispatch(setGameField(updatedField))

			setDirtyState(true)

			const currentUserFilledLength = updatedField.filter(
				cell => cell === currentPlayer?.id
			)?.length

			let hasWinner = false

			if (currentUserFilledLength >= 3) {
				let i = 0

				while (!hasWinner) {
					hasWinner = WIN_PATTERNS[i].every(
						ndx => updatedField[ndx] === currentPlayer?.id
					)

					if (hasWinner) setActiveWinPattern(WIN_PATTERNS[i])

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

				store.dispatch(setGameOverState(true))
			} else if (fieldIsFilled) {
				// DRAW

				store.dispatch(setGameOverState(true))
				store.dispatch(changeDrawState(true))
				store.dispatch(setLoading(false))
				return
			} else {
				// NEXT
				const { PLAYER_1, PLAYER_2 } = PLAYERS

				setCurrentPlayer(() =>
					currentPlayer.id === PLAYER_1.id ? PLAYER_2 : PLAYER_1
				)
			}

			store.dispatch(setLoading(false))
		},
		[currentPlayer, field]
	)

	useEffect(() => {
		if (
			isDirty &&
			isAiOpponent &&
			currentPlayer.id === PLAYERS.PLAYER_2.id
		) {
			const randomThinkTime = randomInRange(128, 1024)
			const opponentId = PLAYERS.PLAYER_1.id
			const aiId = currentPlayer.id

			let targetIndex = null
			const aiToWinIndex = getMissingIndexToWin(field, aiId)

			if (Number.isInteger(aiToWinIndex)) {
				targetIndex = aiToWinIndex
			} else {
				targetIndex =
					getMissingIndexToWin(field, opponentId) ??
					getRandomEmptyIndex(field)
			}

			//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

			cellClickHandler(targetIndex, randomThinkTime)
		}
	}, [currentPlayer, isDirty, field, isAiOpponent, cellClickHandler])

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setField(store.getState().ticTacToeReducer.field)
		})
		return () => unsubscribe()
	}, [])

	return (
		<GameLayout
			isDirty={isDirty}
			isAiOpponent={isAiOpponent}
			setAiOpponent={setAiOpponent}
			restartGame={restartGame}
			currentPlayer={currentPlayer}
			activeWinPattern={activeWinPattern}
			setCurrentPlayer={setCurrentPlayer}
			cellClickHandler={cellClickHandler}
		/>
	)
}
