import PropTypes from 'prop-types'

import { FieldContainer, InformationContainer } from '../'
import styles from './GameLayout.module.scss'

export const GameLayout = ({
	isDirty,
	isAiOpponent,
	setAiOpponent,
	restartGame,
	currentPlayer,
	...fieldProps
}) => {
	return (
		<div className={styles.game}>
			<h1 className={styles.title}>⚔️ Chrome vs IE ⚔️</h1>

			<InformationContainer
				isDirty={isDirty}
				isAiOpponent={isAiOpponent}
				setAiOpponent={setAiOpponent}
				restartGame={restartGame}
				currentPlayer={currentPlayer}
			/>
			<FieldContainer
				{...fieldProps}
				currentPlayer={currentPlayer}
			/>
		</div>
	)
}

GameLayout.propTypes = {
	isDirty: PropTypes.bool,
	isAiOpponent: PropTypes.bool.isRequired,
	setAiOpponent: PropTypes.func.isRequired,
	restartGame: PropTypes.func.isRequired,
	currentPlayer: PropTypes.object.isRequired
}
