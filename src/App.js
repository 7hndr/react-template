import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import styles from './styles/App.module.scss'

import { Footer, Header, Sidebar } from './layout'

import { routeList } from './router'
// 	"homepage": "https://7hndr.github.com/react-template/",

export const App = () => (
	<BrowserRouter
		basename={
			!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
				? ''
				: ''
		}
	>
		<div className={styles.app}>
			<Header />

			<div className={styles.layout}>
				<Sidebar />

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
			</div>
			<Footer />
		</div>
	</BrowserRouter>
)
