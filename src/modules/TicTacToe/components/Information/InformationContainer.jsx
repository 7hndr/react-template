import { useSelector } from 'react-redux'
import { selectFieldByParam } from '../../config/selectors.js'

import PropTypes from 'prop-types'

import { PLAYERS } from '../../config'

import { InformationLayout } from '../'

export const InformationContainer = ({ restartGame }) => {
	const isDraw = useSelector(selectFieldByParam('isDraw'))
	const isLoading = useSelector(selectFieldByParam('isLoading'))
	const currentPlayer = useSelector(selectFieldByParam('currentPlayer'))
	const isGameOver = useSelector(selectFieldByParam('isGameOver'))

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
