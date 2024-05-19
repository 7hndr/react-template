import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import store from '../../../../store'

import styles from './FieldLayout.module.scss'

import { CellItem } from '../'

export const FieldLayout = ({ cellClickHandler, activeWinPattern }) => {
	const [field, setField] = useState(store.getState().ticTacToeReducer.field)
	const [isDraw, setIsDraw] = useState(
		store.getState().ticTacToeReducer.isDraw
	)
	const [isLoading, setIsLoading] = useState(
		store.getState().ticTacToeReducer.isLoading
	)

	const [gameOver, setGameOver] = useState(
		store.getState().ticTacToeReducer.isGameOver
	)

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setIsDraw(store.getState().ticTacToeReducer.isDraw)
			setIsLoading(store.getState().ticTacToeReducer.isLoading)
			setField(store.getState().ticTacToeReducer.field)
			setGameOver(store.getState().ticTacToeReducer.isGameOver)
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
						cellClickHandler={cellClickHandler}
					/>
				)
			})}
		</div>
	)
}

FieldLayout.propTypes = {
	cellClickHandler: PropTypes.func.isRequired,
	activeWinPattern: PropTypes.arrayOf(PropTypes.number)
}
