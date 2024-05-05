import PropTypes from 'prop-types'

import { FieldContainer, InformationContainer } from '../'
import styles from './GameLayout.module.scss'

export const GameLayout = ({
	isDraw,
	isDirty,
	gameOver,
	isAiOpponent,
	isLoading,
	setAiOpponent,
	restartGame,
	currentPlayer,
	...fieldProps
}) => {
	return (
		<div className={styles.game}>
			<h1 className={styles.title}>⚔️ Chrome vs IE ⚔️</h1>

			<InformationContainer
				isDraw={isDraw}
				isDirty={isDirty}
				gameOver={gameOver}
				isAiOpponent={isAiOpponent}
				isLoading={isLoading}
				setAiOpponent={setAiOpponent}
				restartGame={restartGame}
				currentPlayer={currentPlayer}
			/>
			<FieldContainer
				{...fieldProps}
				isDraw={isDraw}
				gameOver={gameOver}
				isLoading={isLoading}
				currentPlayer={currentPlayer}
			/>
		</div>
	)
}

GameLayout.propTypes = {
	isDraw: PropTypes.bool,
	isDirty: PropTypes.bool,
	gameOver: PropTypes.bool,
	isLoading: PropTypes.bool,
	isAiOpponent: PropTypes.bool.isRequired,
	setAiOpponent: PropTypes.func.isRequired,
	restartGame: PropTypes.func.isRequired,
	currentPlayer: PropTypes.object.isRequired
}
