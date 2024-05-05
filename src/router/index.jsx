import { Navigate } from 'react-router-dom'
import {
	FaList,
	FaDice,
	FaHome,
	FaRegUser,
	FaUtensils,
	FaCalculator
} from 'react-icons/fa'
import { Root } from '../layout'
import {
	Home,
	NotFound,
	ToDoPage,
	AuthPage,
	RecipePage,
	JPToDoPage,
	TicTacToePage,
	CalculatorPage,
	JServerToDoPage,
	FirebaseToDoPage
} from '../pages'

export const routeList = [
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '*',
				element: (
					<Navigate
						to='/404'
						replace={true}
					/>
				)
			},
			{ path: '404', element: <NotFound /> },
			{
				index: true,
				element: (
					<Navigate
						to='/home'
						replace={true}
					/>
				)
			},

			{ icon: FaHome, name: 'Home', path: '/home', element: <Home /> },
			{
				icon: FaCalculator,
				name: 'Calculator',
				path: '/calculator',
				element: <CalculatorPage />
			},
			{
				icon: FaList,
				name: 'ToDo list',
				path: '/todo',
				element: <ToDoPage />
			},
			{
				icon: FaUtensils,
				name: 'Recipe',
				path: '/recipe',
				element: <RecipePage />
			},
			{
				icon: FaDice,
				name: 'TicTacToe',
				path: '/tic-tac-toe',
				element: <TicTacToePage />
			},
			{
				icon: FaRegUser,
				name: 'Auth',
				path: '/auth',
				element: <AuthPage />
			},
			{
				icon: FaList,
				name: 'JSONPlaceholder ToDo',
				path: '/jp-todo',
				element: <JPToDoPage />
			},
			{
				icon: FaList,
				name: 'json-server ToDo',
				path: '/json-server-todo',
				element: <JServerToDoPage />,
				children: [
					{
						name: 'json-server ToDo item',
						path: '/json-server-todo/:id',
						element: <JServerToDoPage />
					}
				]
			},
			{
				icon: FaList,
				name: 'Firebase ToDo',
				path: '/firebase-todo',
				element: <FirebaseToDoPage />
			}
		]
	}
]
