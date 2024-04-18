import {
	FaList,
	FaDice,
	FaHome,
	FaRegUser,
	FaUtensils,
	FaCalculator
} from 'react-icons/fa'
import { Home } from '../pages/Home/Home'
import {
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
	{ icon: FaHome, name: 'Home', path: '/', component: Home, exact: true },
	{
		icon: FaCalculator,
		name: 'Calculator',
		path: '/calculator',
		component: CalculatorPage
	},
	{ icon: FaList, name: 'ToDo list', path: '/todo', component: ToDoPage },
	{
		icon: FaUtensils,
		name: 'Recipe',
		path: '/recipe',
		component: RecipePage
	},
	{
		icon: FaDice,
		name: 'TicTacToe',
		path: '/tic-tac-toe',
		component: TicTacToePage
	},
	{
		icon: FaRegUser,
		name: 'Auth',
		path: '/auth',
		component: AuthPage
	},
	{
		icon: FaList,
		name: 'JSONPlaceholder ToDo',
		path: '/jp-todo',
		component: JPToDoPage
	},
	{
		icon: FaList,
		name: 'json-server ToDo',
		path: '/json-server-todo',
		component: JServerToDoPage
	},
	{
		icon: FaList,
		name: 'Firebase ToDo',
		path: '/firebase-todo',
		component: FirebaseToDoPage
	}
]
