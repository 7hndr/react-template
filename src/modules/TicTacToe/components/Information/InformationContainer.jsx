import { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import store from '../../../../store'

import { InformationLayout } from '../'

export const InformationContainer = ({
	isDirty,
	isAiOpponent,
	setAiOpponent,
	restartGame,
	currentPlayer
}) => {
	const [isDraw, setIsDraw] = useState(
		store.getState().ticTacToeReducer.isDraw
	)
	const [isLoading, setIsLoading] = useState(
		store.getState().ticTacToeReducer.isLoading
	)
	const [gameOver, setGameOver] = useState(
		store.getState().ticTacToeReducer.isGameOver
	)

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setIsDraw(store.getState().ticTacToeReducer.isDraw)
			setIsLoading(store.getState().ticTacToeReducer.isLoading)
			setGameOver(store.getState().ticTacToeReducer.isGameOver)
		})

		return () => unsubscribe()
	}, [])

	let headerTitle

	if (isDraw) {
		headerTitle = 'Draw'
	} else if (gameOver) {
		headerTitle = `${currentPlayer.name} wins 🎉`
	} else {
		headerTitle = `Turn: ${currentPlayer.name} ${isLoading ? '🤔' : ''}`
	}

	return (
		<InformationLayout
			isDirty={isDirty}
			isAiOpponent={isAiOpponent}
			setAiOpponent={setAiOpponent}
			restartGame={restartGame}
			headerTitle={headerTitle}
		/>
	)
}

InformationContainer.propTypes = {
	isDirty: PropTypes.bool,
	isAiOpponent: PropTypes.bool.isRequired,
	setAiOpponent: PropTypes.func.isRequired,
	restartGame: PropTypes.func.isRequired,
	currentPlayer: PropTypes.object.isRequired
}
