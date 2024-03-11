import logo from '../../images/logo.svg'
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import { routeList } from '../../config/router'

export const Header = () => (
	<header className={styles.header}>
		<img
			src={logo}
			className={styles.logo}
			alt='logo'
		/>
		<nav className={styles.linksContainer}>
			{routeList.map(({ icon, name, path }) => {
				const IconComponent = icon

				return (
					<NavLink
						key={path}
						to={path}
						className={({ isActive }) =>
							isActive
								? `${styles.activeLink} ${styles.link}`
								: styles.link
						}
					>
						<IconComponent /> {name}
					</NavLink>
				)
			})}
		</nav>
	</header>
)
