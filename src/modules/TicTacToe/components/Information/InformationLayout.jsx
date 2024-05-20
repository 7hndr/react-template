import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import style from './InformationLayout.module.scss'
import store from '../../../../store'
import { setAiOpponent } from '../../config/store'
import { Button, Switch } from '../../../../ui'
import { FaRedo } from 'react-icons/fa'

export const InformationLayout = ({ headerTitle, restartGame }) => {
	const [isDirty, setIsDirty] = useState(
		store.getState().ticTacToeReducer.isFieldDirty
	)
	const [isAiOpponent, setAiStateOpponent] = useState(
		store.getState().ticTacToeReducer.isAiOpponent
	)

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	useEffect(() => {
		const unsubscribe = store.subscribe(() => {
			setIsDirty(store.getState().ticTacToeReducer.isFieldDirty)
			setAiStateOpponent(store.getState().ticTacToeReducer.isAiOpponent)
		})

		return () => unsubscribe()
	}, [])

	return (
		<div className={style.header}>
			<h2>{headerTitle}</h2>
			{isDirty ? (
				<Button onClick={restartGame}>
					<FaRedo />
					Restart
				</Button>
			) : (
				<Switch
					id='ai-player'
					label='AI opponent'
					checked={isAiOpponent}
					onChange={value => store.dispatch(setAiOpponent(value))}
				/>
			)}
		</div>
	)
}

InformationLayout.propTypes = {
	headerTitle: PropTypes.string,
	restartGame: PropTypes.func.isRequired
}
