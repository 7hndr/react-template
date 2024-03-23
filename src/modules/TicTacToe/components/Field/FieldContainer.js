import PropTypes from 'prop-types'

import { FieldLayout } from '../'

export const FieldContainer = ({
	field,
	isDraw,
	gameOver,
	cellClickHandler,
	activeWinPattern
}) => {
	return (
		<FieldLayout
			field={field}
			isDraw={isDraw}
			gameOver={gameOver}
			cellClickHandler={cellClickHandler}
			activeWinPattern={activeWinPattern}
		/>
	)
}

FieldContainer.propTypes = {
	isDraw: PropTypes.bool,
	gameOver: PropTypes.bool,
	cellClickHandler: PropTypes.func.isRequired,
	field: PropTypes.arrayOf(PropTypes.object).isRequired,
	activeWinPattern: PropTypes.arrayOf(PropTypes.number)
}
