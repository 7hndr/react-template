import styles from './Field.module.scss'
import { CellItem } from '../'
import { selectFieldByParam } from '../../config/selectors.js'
import { useSelector } from 'react-redux'

export const Field = () => {
	const field = useSelector(selectFieldByParam('field'))
	const isDraw = useSelector(selectFieldByParam('isDraw'))
	const isLoading = useSelector(selectFieldByParam('isLoading'))
	const isGameOver = useSelector(selectFieldByParam('isGameOver'))
	const activeWinPattern = useSelector(selectFieldByParam('activeWinPattern'))

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
