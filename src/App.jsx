import { routeList } from './router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

export const App = () => {
	const router = createBrowserRouter(routeList)

	return (
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	)
}
