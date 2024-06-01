import PropTypes from 'prop-types'
import styles from './CellItem.module.scss'
import { PLAYERS } from '../../config'
import { useDispatch } from 'react-redux'
import { makeStep } from '../../config/actions.js'

export const CellItem = ({ cellId, index, noHover, isItemDisabled }) => {
	const dispatch = useDispatch()
	const playersArr = Object.values(PLAYERS)
	const IconComponent = playersArr.find(p => p.id === cellId)?.icon

	return (
		<div
			className={`${styles.cell} ${
				isItemDisabled ? styles.disabledCell : ''
			} ${noHover ? styles.noHover : ''}`}
			onClick={() => dispatch(makeStep(index))}
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

CellItem.propTypes = {
	cellId: PropTypes.number,
	index: PropTypes.number,
	noHover: PropTypes.bool,
	isItemDisabled: PropTypes.bool
}
