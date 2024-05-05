import PropTypes from 'prop-types'

import style from './InformationLayout.module.scss'

import { Button, Switch } from '../../../../ui'
import { FaRedo } from 'react-icons/fa'

export const InformationLayout = ({
	isDirty,
	headerTitle,
	restartGame,
	setAiOpponent,
	isAiOpponent
}) => {
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
					onChange={setAiOpponent}
				/>
			)}
		</div>
	)
}

InformationLayout.propTypes = {
	isDirty: PropTypes.bool,
	headerTitle: PropTypes.string,
	isAiOpponent: PropTypes.bool.isRequired,
	setAiOpponent: PropTypes.func.isRequired,
	restartGame: PropTypes.func.isRequired
}
