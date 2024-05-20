import { useEffect, useState } from 'react'

import PropTypes from 'prop-types'

import store from '../../../../store'
import { PLAYERS } from '../../config'

import { InformationLayout } from '../'

export const InformationContainer = ({ restartGame }) => {
	const [isDraw, setIsDraw] = useState(store.getState().isDraw)
	const [isLoading, setIsLoading] = useState(store.getState().isLoading)
	const [player, setPlayer] = useState(store.getState().currentPlayer)
	const [gameOver, setGameOver] = useState(store.getState().isGameOver)
	const playersArr = Object.values(PLAYERS)
	// const playerName = playersArr.find(p => p.id === player)?.name

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setIsDraw(store.getState().isDraw)
			setIsLoading(store.getState().isLoading)
			setGameOver(store.getState().isGameOver)
			setPlayer(store.getState().currentPlayer)
		})

		return () => unsubscribe()
	}, [])

	let headerTitle

	if (isDraw) {
		headerTitle = 'Draw'
	} else if (gameOver) {
		headerTitle = `${
			playersArr.find(p => p.id === store.getState().currentPlayer)?.name
		} wins 🎉`
	} else {
		headerTitle = `Turn: ${playersArr.find(p => p.id === player)?.name} ${
			isLoading ? '🤔' : ''
		}`
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
