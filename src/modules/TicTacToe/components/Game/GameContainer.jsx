import { useState, useEffect, useCallback } from 'react'

import { FIELD_SIZE, INITIAL_FIELD, WIN_PATTERNS, PLAYERS } from '../../config'
import { GameLayout } from './GameLayout'

// --------------------------------------------------------------

const randomInRange = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min

const getEmptyIndexList = field =>
	field.reduce((a, c, i) => (c?.id ? a : [...a, i]), [])

const getRandomEmptyIndex = field => {
	const emptyList = getEmptyIndexList(field)
	const randomIndex = randomInRange(0, emptyList.length - 1)
	return emptyList[randomIndex]
}

const getMissingIndexToWin = (field, playerId) => {
	const emptyIndexList = getEmptyIndexList(field)

	let targetIndex = null
	let i = 0

	while (!Number.isInteger(targetIndex)) {
		const pattern = WIN_PATTERNS[i]

		let opponentMatchedIndexCount = 0
		const opponentNeededToWin = []

		pattern.forEach(i => {
			if (field[i]?.id === playerId) {
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

// --------------------------------------------------------------

export const GameContainer = () => {
	const [isDraw, setDrawState] = useState(false)
	const [gameOver, setGameOver] = useState(false)
	const [isLoading, setLoading] = useState(false)
	const [isDirty, setDirtyState] = useState(false)
	const [field, setField] = useState(INITIAL_FIELD)
	const [isAiOpponent, setAiOpponent] = useState(true)
	const [activeWinPattern, setActiveWinPattern] = useState(null)
	const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.PLAYER_1)

	// --------------------------------------------------------------

	const restartGame = () => {
		setLoading(false)
		setGameOver(false)
		setDrawState(false)
		setAiOpponent(true)
		setDirtyState(false)
		setField(INITIAL_FIELD)
		setActiveWinPattern(null)
		setCurrentPlayer(PLAYERS.PLAYER_1)
	}

	const cellClickHandler = useCallback(
		async (i, delay) => {
			if (delay) {
				setLoading(true)
				await new Promise(r => setTimeout(() => r(), delay))
			}
			if (gameOver || !!field[i]?.id) return

			const uipdatedField = field.toSpliced(i, 1, currentPlayer)

			setField(() => uipdatedField)
			setDirtyState(true)

			const currentUserFilledLength = uipdatedField.filter(
				f => f?.id === currentPlayer?.id
			)?.length

			let hasWinner = false

			if (currentUserFilledLength >= 3) {
				let i = 0

				while (!hasWinner) {
					hasWinner = WIN_PATTERNS[i].every(
						ndx => uipdatedField[ndx]?.id === currentPlayer?.id
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
				uipdatedField.filter(f => !!f?.id).length === FIELD_SIZE

			if (hasWinner) {
				// WIN

				setGameOver(true)
			} else if (fieldIsFilled) {
				// DRAW

				setGameOver(true)
				setDrawState(true)
				setLoading(false)
				return
			} else {
				// NEXT
				const { PLAYER_1, PLAYER_2 } = PLAYERS

				setCurrentPlayer(() =>
					currentPlayer.id === PLAYER_1.id ? PLAYER_2 : PLAYER_1
				)
			}

			setLoading(false)
		},
		[currentPlayer, field, gameOver]
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

			// --------------------------------------------------------------

			cellClickHandler(targetIndex, randomThinkTime)
		}
	}, [currentPlayer, isDirty, isAiOpponent, field, cellClickHandler])

	return (
		<GameLayout
			field={field}
			isDraw={isDraw}
			isDirty={isDirty}
			gameOver={gameOver}
			setField={setField}
			isAiOpponent={isAiOpponent}
			isLoading={isLoading}
			setAiOpponent={setAiOpponent}
			setGameOver={setGameOver}
			restartGame={restartGame}
			setDrawState={setDrawState}
			currentPlayer={currentPlayer}
			activeWinPattern={activeWinPattern}
			setCurrentPlayer={setCurrentPlayer}
			cellClickHandler={cellClickHandler}
		/>
	)
}
