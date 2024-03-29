import {
	FaCalculator,
	FaHome,
	FaList,
	FaUtensils,
	FaDice
} from 'react-icons/fa'
import { Home } from '../pages/Home/Home'
import { CalculatorPage, ToDoPage, RecipePage, TicTacToePage } from '../pages'

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
	}
]
