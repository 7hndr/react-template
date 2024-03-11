import { HashRouter, Routes, Route } from 'react-router-dom'

import styles from './styles/App.module.scss'

import { Header } from './layout/Header/Header'
import { Footer } from './layout/Footer/Footer'

import { routeList } from './config/router'

export const App = () => (
	<HashRouter>
		<div className={styles.app}>
			<Header />

			<div className={styles.content}>
				<Routes>
					{routeList.map(r => {
						const Component = r.component
						return (
							<Route
								path={r.path}
								key={r.path}
								element={<Component />}
							/>
						)
					})}
				</Routes>
			</div>

			<Footer />
		</div>
	</HashRouter>
)
