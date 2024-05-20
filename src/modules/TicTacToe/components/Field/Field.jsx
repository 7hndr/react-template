import { useEffect, useState } from 'react'
import store from '../../../../store'
import styles from './Field.module.scss'
import { CellItem } from '../'

export const Field = () => {
	const getStoreParam = param => store.getState().ticTacToeReducer[param]

	const [field, setField] = useState(getStoreParam('field'))
	const [isDraw, setIsDraw] = useState(getStoreParam('isDraw'))
	const [gameOver, setGameOver] = useState(getStoreParam('isGameOver'))
	const [isLoading, setIsLoading] = useState(getStoreParam('isLoading'))
	const [activeWinPattern, setActiveWinPattern] = useState(
		getStoreParam('activeWinPattern')
	)

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setField(getStoreParam('field'))
			setIsDraw(getStoreParam('isDraw'))
			setIsLoading(getStoreParam('isLoading'))
			setGameOver(getStoreParam('isGameOver'))
			setActiveWinPattern(getStoreParam('activeWinPattern'))
		})

		return () => unsubscribe()
	}, [])

	return (
		<div className={styles.field}>
			{field.map((cellId, i) => {
				const isItemDisabled =
					(gameOver && !isDraw && !activeWinPattern.includes(i)) ||
					(gameOver && isDraw)

				return (
					<CellItem
						key={i}
						index={i}
						cellId={cellId}
						noHover={gameOver || isLoading}
						isItemDisabled={isItemDisabled}
					/>
				)
			})}
		</div>
	)
}
