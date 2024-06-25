import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectFieldByKey } from '../../config/selectors.js'
import { setAiOpponent } from '../../config/actions.js'

import { Button, Switch } from '../../../../ui'
import { FaRedo } from 'react-icons/fa'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

class InformationLayoutComponent extends Component {
	handleSwitchChange = value => {
		this.props.setAiOpponent(value)
	}

	render() {
		const { headerTitle, restartGame, isFieldDirty, isAiOpponent } =
			this.props

		return (
			<div className='grid grid-cols-2 gap-4 h-10 items-center'>
				<h2>{headerTitle}</h2>
				{isFieldDirty ? (
					<Button onClick={restartGame}>
						<FaRedo />
						Restart
					</Button>
				) : (
					<Switch
						id='ai-player'
						label='AI opponent'
						checked={isAiOpponent}
						onChange={this.handleSwitchChange}
					/>
				)}
			</div>
		)
	}
}

InformationLayoutComponent.propTypes = {
	headerTitle: PropTypes.string,
	restartGame: PropTypes.func.isRequired,
	isFieldDirty: PropTypes.bool.isRequired,
	isAiOpponent: PropTypes.bool.isRequired,
	setAiOpponent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	isFieldDirty: selectFieldByKey('isFieldDirty')(state),
	isAiOpponent: selectFieldByKey('isAiOpponent')(state)
})

export const InformationLayout = connect(mapStateToProps, {
	setAiOpponent
})(InformationLayoutComponent)
