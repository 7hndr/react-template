import PropTypes from 'prop-types'

import { FieldContainer, InformationContainer } from '../'
import styles from './GameLayout.module.scss'

export const GameLayout = ({
	field,
	isDraw,
	isDirty,
	gameOver,
	restartGame,
	currentPlayer,
	activeWinPattern,
	cellClickHandler
}) => {
	return (
		<div className={styles.game}>
			<h1 className={styles.title}>⚔️ Chrome vs IE ⚔️</h1>

			<InformationContainer
				isDraw={isDraw}
				isDirty={isDirty}
				gameOver={gameOver}
				currentPlayer={currentPlayer}
				restartGame={restartGame}
			/>
			<FieldContainer
				field={field}
				isDraw={isDraw}
				gameOver={gameOver}
				currentPlayer={currentPlayer}
				activeWinPattern={activeWinPattern}
				cellClickHandler={cellClickHandler}
			/>
		</div>
	)
}

GameLayout.propTypes = {
	isDraw: PropTypes.bool,
	isDirty: PropTypes.bool,
	gameOver: PropTypes.bool,
	restartGame: PropTypes.func.isRequired,
	currentPlayer: PropTypes.object.isRequired,
	cellClickHandler: PropTypes.func.isRequired,
	activeWinPattern: PropTypes.arrayOf(PropTypes.number),
	field: PropTypes.arrayOf(PropTypes.object).isRequired
}
