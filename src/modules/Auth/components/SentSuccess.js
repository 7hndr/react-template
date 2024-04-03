import { FaUserCheck } from 'react-icons/fa'
import { Button } from '../../../ui'

import styles from './SentSuccess.module.scss'

export const SentSuccess = ({ handleTryAgain }) => {
	return (
		<>
			<FaUserCheck
				size='3rem'
				className={`${styles.icon} ${styles.success}`}
			/>
			<Button onClick={handleTryAgain}>Try again</Button>
		</>
	)
}
