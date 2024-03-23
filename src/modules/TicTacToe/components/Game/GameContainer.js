import { useState } from 'react'

import { FIELD_SIZE, INITIAL_FIELD, WIN_PATTERNS, PLAYERS } from '../../config'
import { GameLayout } from './GameLayout'

export const GameContainer = () => {
	const [isDraw, setDrawState] = useState(false)
	const [gameOver, setGameOver] = useState(false)
	const [isDirty, setDirtyState] = useState(false)
	const [field, setField] = useState(INITIAL_FIELD)
	const [activeWinPattern, setActiveWinPattern] = useState(null)
	const [currentPlayer, setCurrentPlayer] = useState(PLAYERS.PLAYER_1)

	// ---------------------------------------------

	const restartGame = () => {
		setGameOver(false)
		setDrawState(false)
		setDirtyState(false)
		setField(INITIAL_FIELD)
		setActiveWinPattern(null)
		setCurrentPlayer(PLAYERS.PLAYER_1)
	}

	const cellClickHandler = i => {
		if (gameOver || !!field[i]?.id) return

		const uipdatedField = field.toSpliced(i, 1, currentPlayer)

		setField(() => uipdatedField)
		setDirtyState(true)

		const filledLength = uipdatedField.filter(
			f => f?.id === currentPlayer?.id
		)?.length

		let hasWinner = false

		if (filledLength >= 5) {
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

			return
		} else {
			// NEXT

			const { PLAYER_1, PLAYER_2 } = PLAYERS

			setCurrentPlayer(
				currentPlayer.id === PLAYER_1.id ? PLAYER_2 : PLAYER_1
			)
		}
	}

	return (
		<GameLayout
			field={field}
			isDraw={isDraw}
			isDirty={isDirty}
			gameOver={gameOver}
			setField={setField}
			restartGame={restartGame}
			setGameOver={setGameOver}
			setDrawState={setDrawState}
			currentPlayer={currentPlayer}
			activeWinPattern={activeWinPattern}
			setCurrentPlayer={setCurrentPlayer}
			cellClickHandler={cellClickHandler}
		/>
	)
}
