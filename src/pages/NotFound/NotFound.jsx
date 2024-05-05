import styles from './NotFound.module.scss'

import { Button } from '../../ui'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
	const navigate = useNavigate()

	return (
		<div className={styles.notFoundContainer}>
			<h1 className={styles.heading}>Oops!</h1>
			<p className={styles.message}>Something went wrong</p>

			<Button
				simple
				onClick={() => navigate('/home')}
			>
				<FaArrowLeft />
				Go home
			</Button>
		</div>
	)
}
