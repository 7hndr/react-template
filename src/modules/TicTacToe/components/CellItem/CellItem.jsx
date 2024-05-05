import PropTypes from 'prop-types'
import styles from './CellItem.module.scss'

export const CellItem = ({
	cell,
	index,
	noHover,
	isItemDisabled,
	cellClickHandler
}) => {
	const IconComponent = cell?.icon

	return (
		<div
			className={`${styles.cell} ${
				isItemDisabled ? styles.disabledCell : ''
			} ${noHover ? styles.noHover : ''}`}
			onClick={() => cellClickHandler(index)}
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
	cell: PropTypes.object,
	index: PropTypes.number,
	noHover: PropTypes.bool,
	isItemDisabled: PropTypes.bool,
	cellClickHandler: PropTypes.func.isRequired
}
