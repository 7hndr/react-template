import styles from './Field.module.scss'
import { CellItem } from '../'
import { selectFieldByKey } from '../../config/selectors.js'
import { useSelector } from 'react-redux'

export const Field = () => {
	const field = useSelector(selectFieldByKey('field'))
	const isDraw = useSelector(selectFieldByKey('isDraw'))
	const isLoading = useSelector(selectFieldByKey('isLoading'))
	const isGameOver = useSelector(selectFieldByKey('isGameOver'))
	const activeWinPattern = useSelector(selectFieldByKey('activeWinPattern'))

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	return (
		<div className={styles.field}>
			{field.map((cellId, i) => {
				const isItemDisabled =
					(isGameOver && !isDraw && !activeWinPattern.includes(i)) ||
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
