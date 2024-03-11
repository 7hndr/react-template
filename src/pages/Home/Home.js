import { FaBolt } from 'react-icons/fa'

import styles from './Home.module.scss'

export const Home = () => {
	return (
		<div className={styles.home}>
			<h1>
				<FaBolt /> Hi there <FaBolt />
			</h1>
		</div>
	)
}
