import styles from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom'
import { routeList } from '../../router/index.jsx'

export const Sidebar = () => {
	const navLinks = routeList
		.find(route => route.path === '/')
		.children.filter(route => !!route.path?.startsWith('/'))

	return (
		<div className={styles.sidebar}>
			<h3>App list</h3>
			<div className={styles.sidebarWrapper}>
				<nav className={styles.linksContainer}>
					{navLinks
						.filter(({ path }) => path !== '*')
						.map(({ icon, name, path }) => {
							const _path = path.replace('/*', '')
							const IconComponent = icon

							return (
								<NavLink
									key={path}
									to={_path}
									className={({ isActive }) =>
										isActive
											? `${styles.activeLink} ${styles.link}`
											: styles.link
									}
								>
									<IconComponent />
									<span className={styles.linkText}>
										{name}
									</span>
								</NavLink>
							)
						})}
				</nav>
			</div>
		</div>
	)
}
