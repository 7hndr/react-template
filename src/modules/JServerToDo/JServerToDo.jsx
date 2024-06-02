import { Routes, Route } from 'react-router-dom'
import { JServerToDoItem, JServerToDoList } from './components'

export const JServerToDo = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<JServerToDoList />}
			/>
			<Route
				path='/:id'
				element={<JServerToDoItem />}
			/>
		</Routes>
	)
}
