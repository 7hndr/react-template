import { FaCalculator, FaHome, FaList, FaCookieBite } from 'react-icons/fa'
import { Home } from '../pages/Home/Home'
import { CalculatorPage } from '../pages/Calculator/Calculator'
import { ToDoPage } from '../pages/ToDo/ToDo'
import { RecipePage } from '../pages/Recipe/Recipe'

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
		icon: FaCookieBite,
		name: 'Recipe',
		path: '/recipe',
		component: RecipePage
	}
]
