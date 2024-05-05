import { routeList } from './router'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
export const App = () => {
	const router = createBrowserRouter(routeList)
	return <RouterProvider router={router} />
}
