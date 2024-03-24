import PropTypes from 'prop-types'

import { InformationLayout } from '../'

export const InformationContainer = ({
	isDraw,
	isDirty,
	gameOver,
	isAiOpponent,
	isLoading,
	setAiOpponent,
	restartGame,
	currentPlayer
}) => {
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
	isDraw: PropTypes.bool,
	isDirty: PropTypes.bool,
	gameOver: PropTypes.bool,
	isLoading: PropTypes.bool,
	isAiOpponent: PropTypes.bool.isRequired,
	setAiOpponent: PropTypes.func.isRequired,
	restartGame: PropTypes.func.isRequired,
	currentPlayer: PropTypes.object.isRequired
}
