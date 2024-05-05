import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routeList } from './router'
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

const router = createBrowserRouter(routeList)

root.render(<RouterProvider router={router} />)

// basename={
// 	!process.env.NODE_ENV || process.env.NODE_ENV === 'development'
// 		? ''
// 		: ''
// }
