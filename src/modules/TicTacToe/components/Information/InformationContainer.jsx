import { useSelector } from 'react-redux'
import { selectFieldByKey } from '../../config/selectors.js'

import PropTypes from 'prop-types'

import { PLAYERS } from '../../config'

import { InformationLayout } from '../'

export const InformationContainer = ({ restartGame }) => {
	const isDraw = useSelector(selectFieldByKey('isDraw'))
	const isLoading = useSelector(selectFieldByKey('isLoading'))
	const currentPlayer = useSelector(selectFieldByKey('currentPlayer'))
	const isGameOver = useSelector(selectFieldByKey('isGameOver'))

	const playersArr = Object.values(PLAYERS)

	let headerTitle

	if (isDraw) {
		headerTitle = 'Draw'
	} else if (isGameOver) {
		headerTitle = `${
			playersArr.find(p => p.id === currentPlayer)?.name
		} wins 🎉`
	} else {
		headerTitle = `Turn: ${
			playersArr.find(p => p.id === currentPlayer)?.name
		} ${isLoading ? '🤔' : ''}`
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
