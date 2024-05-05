import { Outlet } from 'react-router-dom'
import styles from './Root.module.scss'
import { Footer, Header, Sidebar } from '..'

export const Root = () => {
	return (
		<>
			<div className={styles.root}>
				<Header />

				<div className={styles.layout}>
					<Sidebar />

					<div className={styles.content}>
						<Outlet />
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}
