import { Component } from 'react'
import PropTypes from 'prop-types'

import { Field, InformationContainer } from '../'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

class GameLayoutComponent extends Component {
	render() {
		const { restartGame } = this.props
		return (
			<div className='grid gap-6'>
				<h1 className='text-3xl font-bold text-center'>
					⚔️ Chrome vs IE ⚔️
				</h1>

				<InformationContainer restartGame={restartGame} />
				<Field />
			</div>
		)
	}
}

GameLayoutComponent.propTypes = {
	restartGame: PropTypes.func.isRequired
}

export const GameLayout = GameLayoutComponent
