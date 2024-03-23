import PropTypes from 'prop-types'

import style from './InformationLayout.module.scss'

import { Button } from '../../../../ui'
import { FaRedo } from 'react-icons/fa'

export const InformationLayout = ({ isDirty, headerTitle, restartGame }) => {
	return (
		<div className={style.header}>
			<h2>{headerTitle}</h2>
			{isDirty && (
				<Button onClick={restartGame}>
					<FaRedo />
					Restart
				</Button>
			)}
		</div>
	)
}

InformationLayout.propTypes = {
	isDirty: PropTypes.bool,
	headerTitle: PropTypes.string,
	restartGame: PropTypes.func.isRequired
}
