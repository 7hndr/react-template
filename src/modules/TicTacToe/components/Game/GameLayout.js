import PropTypes from 'prop-types'

import { FieldContainer, InformationContainer } from '../'
import styles from './GameLayout.module.scss'

export const GameLayout = ({
	isDraw,
	gameOver,
	currentPlayer,
	restartGame,
	isDirty,
	...fieldProps
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
				currentPlayer={currentPlayer}
				gameOver={gameOver}
				isDraw={isDraw}
				{...fieldProps}
			/>
		</div>
	)
}

GameLayout.propTypes = {
	isDraw: PropTypes.bool,
	isDirty: PropTypes.bool,
	gameOver: PropTypes.bool,
	restartGame: PropTypes.func.isRequired,
	currentPlayer: PropTypes.object.isRequired
}
