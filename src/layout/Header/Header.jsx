import logo from '../../images/logo.svg'
import styles from './Header.module.scss'

export const Header = () => (
	<header className={styles.header}>
		<img
			src={logo}
			className={styles.logo}
			alt='logo'
		/>
		<h1>Thndr`s apps</h1>
	</header>
)
