import PropTypes from 'prop-types'

import { FieldLayout } from '../'

export const FieldContainer = ({
	field,
	isDraw,
	gameOver,
	isLoading,
	cellClickHandler,
	activeWinPattern
}) => {
	return (
		<FieldLayout
			field={field}
			isDraw={isDraw}
			gameOver={gameOver}
			isLoading={isLoading}
			cellClickHandler={cellClickHandler}
			activeWinPattern={activeWinPattern}
		/>
	)
}

FieldContainer.propTypes = {
	isDraw: PropTypes.bool,
	gameOver: PropTypes.bool,
	isLoading: PropTypes.bool,
	cellClickHandler: PropTypes.func.isRequired,
	field: PropTypes.arrayOf(PropTypes.object).isRequired,
	activeWinPattern: PropTypes.arrayOf(PropTypes.number)
}
