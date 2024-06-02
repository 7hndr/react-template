import PropTypes from 'prop-types'

import { Field, InformationContainer } from '../'
import styles from './GameLayout.module.scss'

export const GameLayout = ({ restartGame }) => {
	return (
		<div className={styles.game}>
			<h1 className={styles.title}>⚔️ Chrome vs IE ⚔️</h1>

			<InformationContainer restartGame={restartGame} />
			<Field />
		</div>
	)
}

GameLayout.propTypes = {
	restartGame: PropTypes.func.isRequired
}
