import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CellItem } from '../'
import { selectFieldByKey } from '../../config/selectors.js'

class FieldComponent extends Component {
	render() {
		const { field, isDraw, isLoading, isGameOver, activeWinPattern } =
			this.props

		return (
			<div className='grid grid-cols-3 gap-8'>
				{field.map((cellId, i) => {
					const isItemDisabled =
						(isGameOver &&
							!isDraw &&
							!activeWinPattern.includes(i)) ||
						(isGameOver && isDraw)

					return (
						<CellItem
							key={i}
							index={i}
							cellId={cellId}
							noHover={isGameOver || isLoading}
							isItemDisabled={isItemDisabled}
						/>
					)
				})}
			</div>
		)
	}
}

FieldComponent.propTypes = {
	field: PropTypes.array.isRequired,
	isDraw: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isGameOver: PropTypes.bool.isRequired,
	activeWinPattern: PropTypes.array
}

const mapStateToProps = state => ({
	field: selectFieldByKey('field')(state),
	isDraw: selectFieldByKey('isDraw')(state),
	isLoading: selectFieldByKey('isLoading')(state),
	isGameOver: selectFieldByKey('isGameOver')(state),
	activeWinPattern: selectFieldByKey('activeWinPattern')(state)
})

export const Field = connect(mapStateToProps)(FieldComponent)
