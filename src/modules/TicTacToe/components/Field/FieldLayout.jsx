import PropTypes from 'prop-types'

import styles from './FieldLayout.module.scss'
import { CellItem } from '../'

export const FieldLayout = ({
	field,
	isDraw,
	gameOver,
	isLoading,
	cellClickHandler,
	activeWinPattern
}) => {
	return (
		<div className={styles.field}>
			{field.map((cell, i) => {
				const isItemDisabled =
					(gameOver && !isDraw && !activeWinPattern.includes(i)) ||
					(gameOver && isDraw)

				return (
					<CellItem
						key={i}
						index={i}
						cell={cell}
						noHover={gameOver || isLoading}
						isItemDisabled={isItemDisabled}
						cellClickHandler={cellClickHandler}
					/>
				)
			})}
		</div>
	)
}

FieldLayout.propTypes = {
	isDraw: PropTypes.bool,
	gameOver: PropTypes.bool,
	isLoading: PropTypes.bool,
	cellClickHandler: PropTypes.func.isRequired,
	field: PropTypes.arrayOf(PropTypes.object).isRequired,
	activeWinPattern: PropTypes.arrayOf(PropTypes.number)
}
