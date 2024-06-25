import { Component } from 'react'
import PropTypes from 'prop-types'
// import styles from './CellItem.module.scss'
import { PLAYERS } from '../../config'
import { connect } from 'react-redux'
import { makeStep } from '../../config/actions.js'

class CellItemComponent extends Component {
	handleClick = () => {
		const { index, dispatch } = this.props
		dispatch(makeStep(index))
	}

	render() {
		const { cellId, noHover, isItemDisabled } = this.props
		const playersArr = Object.values(PLAYERS)
		const IconComponent = playersArr.find(p => p.id === cellId)?.icon

		return (
			<div
				className={`grid place-items-center p-4 cursor-pointer rounded-lg w-24 h-24 transition-transform duration-150 ease-in bg-cyan-400 shadow-md hover:scale-110 hover:shadow-lg ${
					isItemDisabled ? 'opacity-50' : ''
				} ${noHover ? 'pointer-events-none' : ''}`}
				onClick={this.handleClick}
			>
				{IconComponent && (
					<IconComponent
						size={'2.5rem'}
						color={'var(--contrast-text)'}
					/>
				)}
			</div>
		)
	}
}

CellItemComponent.propTypes = {
	cellId: PropTypes.number,
	index: PropTypes.number,
	noHover: PropTypes.bool,
	isItemDisabled: PropTypes.bool,
	dispatch: PropTypes.func.isRequired
}

export const CellItem = connect()(CellItemComponent)
