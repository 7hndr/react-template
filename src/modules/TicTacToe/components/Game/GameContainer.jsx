import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GameLayout } from './GameLayout'
import { selectFieldByKey } from '../../config/selectors.js'
import {
	changeDrawState,
	setGameOverState,
	setLoading,
	setAiOpponent,
	setGameField,
	setDirtyState,
	setActiveWinPattern,
	setCurrentPlayer,
	makeAiStep
} from '../../config/actions.js'

class GameContainerComponent extends Component {
	restartGame = () => {
		const { dispatch } = this.props
		dispatch(changeDrawState(false))
		dispatch(setGameOverState(false))
		dispatch(setLoading(false))
		dispatch(setAiOpponent(true))
		dispatch(setGameField())
		dispatch(setDirtyState(false))
		dispatch(setActiveWinPattern(null))
		dispatch(setCurrentPlayer())
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentPlayer !== this.props.currentPlayer) {
			this.props.dispatch(makeAiStep())
		}
	}

	render() {
		return <GameLayout restartGame={this.restartGame} />
	}
}

GameContainerComponent.propTypes = {
	currentPlayer: PropTypes.number.isRequired,
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	currentPlayer: selectFieldByKey('currentPlayer')(state)
})

export const GameContainer = connect(mapStateToProps)(GameContainerComponent)
