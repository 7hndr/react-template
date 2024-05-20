import { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import store from '../../../../store'
import { PLAYERS } from '../../config'

import { InformationLayout } from '../'

export const InformationContainer = ({ restartGame }) => {
	const [isDraw, setIsDraw] = useState(
		store.getState().ticTacToeReducer.isDraw
	)
	const [isLoading, setIsLoading] = useState(
		store.getState().ticTacToeReducer.isLoading
	)
	const [player, setPlayer] = useState(
		store.getState().ticTacToeReducer.currentPlayer
	)
	const [gameOver, setGameOver] = useState(
		store.getState().ticTacToeReducer.isGameOver
	)
	const playersArr = Object.values(PLAYERS)
	const playerName = playersArr.find(p => p.id === player)?.name

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setIsDraw(store.getState().ticTacToeReducer.isDraw)
			setIsLoading(store.getState().ticTacToeReducer.isLoading)
			setGameOver(store.getState().ticTacToeReducer.isGameOver)
			setPlayer(store.getState().ticTacToeReducer.currentPlayer)
		})

		return () => unsubscribe()
	}, [])

	let headerTitle

	if (isDraw) {
		headerTitle = 'Draw'
	} else if (gameOver) {
		headerTitle = `${playerName} wins 🎉`
	} else {
		headerTitle = `Turn: ${playerName} ${isLoading ? '🤔' : ''}`
	}

	return (
		<InformationLayout
			restartGame={restartGame}
			headerTitle={headerTitle}
		/>
	)
}

InformationContainer.propTypes = {
	restartGame: PropTypes.func.isRequired
}
