import styles from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom'
import { routeList } from '../../config/router'

export const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<h3>App list</h3>
			<div className={styles.sidebarWrapper}>
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
			</div>
		</div>
	)
}
