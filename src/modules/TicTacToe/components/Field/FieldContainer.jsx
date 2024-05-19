import PropTypes from 'prop-types'

import { FieldLayout } from '../'

export const FieldContainer = ({ cellClickHandler, activeWinPattern }) => {
	return (
		<FieldLayout
			cellClickHandler={cellClickHandler}
			activeWinPattern={activeWinPattern}
		/>
	)
}

FieldContainer.propTypes = {
	cellClickHandler: PropTypes.func.isRequired,
	activeWinPattern: PropTypes.arrayOf(PropTypes.number)
}
