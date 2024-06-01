import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectFieldByParam } from '../../config/selectors.js'
import { setAiOpponent } from '../../config/actions.js'

import style from './InformationLayout.module.scss'
import { Button, Switch } from '../../../../ui'
import { FaRedo } from 'react-icons/fa'

export const InformationLayout = ({ headerTitle, restartGame }) => {
	const dispatch = useDispatch()
	const isFieldDirty = useSelector(selectFieldByParam('isFieldDirty'))
	const isAiOpponent = useSelector(selectFieldByParam('isAiOpponent'))

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	return (
		<div className={style.header}>
			<h2>{headerTitle}</h2>
			{isFieldDirty ? (
				<Button onClick={restartGame}>
					<FaRedo />
					Restart
				</Button>
			) : (
				<Switch
					id='ai-player'
					label='AI opponent'
					checked={isAiOpponent}
					onChange={value => dispatch(setAiOpponent(value))}
				/>
			)}
		</div>
	)
}

InformationLayout.propTypes = {
	headerTitle: PropTypes.string,
	restartGame: PropTypes.func.isRequired
}
