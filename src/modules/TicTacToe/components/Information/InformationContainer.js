import PropTypes from 'prop-types'

import { InformationLayout } from '../'

export const InformationContainer = ({
	isDraw,
	gameOver,
	currentPlayer,
	isDirty,
	restartGame
}) => {
	let headerTitle

	if (isDraw) {
		headerTitle = 'Draw'
	} else if (gameOver) {
		headerTitle = `${currentPlayer.name} wins 🎉`
	} else {
		headerTitle = `Turn: ${currentPlayer.name}`
	}

	return (
		<InformationLayout
			isDirty={isDirty}
			headerTitle={headerTitle}
			restartGame={restartGame}
		/>
	)
}

InformationContainer.propTypes = {
	isDraw: PropTypes.bool,
	gameOver: PropTypes.bool,
	currentPlayer: PropTypes.object.isRequired,
	isDirty: PropTypes.bool,
	restartGame: PropTypes.func.isRequired
}
