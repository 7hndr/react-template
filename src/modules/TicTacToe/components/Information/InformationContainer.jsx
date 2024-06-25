import { Component } from 'react'
import { connect } from 'react-redux'
import { selectFieldByKey } from '../../config/selectors.js'

import PropTypes from 'prop-types'

import { PLAYERS } from '../../config'

import { InformationLayout } from '../'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

class InformationContainerComponent extends Component {
	render() {
		const { restartGame, isDraw, isGameOver, currentPlayer, isLoading } =
			this.props

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
}

InformationContainerComponent.propTypes = {
	restartGame: PropTypes.func.isRequired,
	isDraw: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isGameOver: PropTypes.bool.isRequired,
	currentPlayer: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
	isDraw: selectFieldByKey('isDraw')(state),
	isLoading: selectFieldByKey('isLoading')(state),
	isGameOver: selectFieldByKey('isGameOver')(state),
	currentPlayer: selectFieldByKey('currentPlayer')(state)
})

export const InformationContainer = connect(mapStateToProps)(
	InformationContainerComponent
)
