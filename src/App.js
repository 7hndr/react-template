import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import styles from './styles/App.module.scss'

import { Header } from './layout/Header/Header'
import { Footer } from './layout/Footer/Footer'

import { routeList } from './config/router'

export const App = () => (
	<BrowserRouter
		basename={
			!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
				? ''
				: '/react-template'
		}
	>
		<div className={styles.app}>
			<Header />

			<div className={styles.content}>
				<Routes>
					{routeList.map(r => {
						const Component = r.component
						return (
							<Route
								exact={!!r.exact}
								path={r.path}
								key={r.path}
								element={<Component />}
							/>
						)
					})}
					<Route
						path='*'
						element={
							<Navigate
								replace
								to='/'
							/>
						}
					/>
				</Routes>
			</div>

			<Footer />
		</div>
	</BrowserRouter>
)
