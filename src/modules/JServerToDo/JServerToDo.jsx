import { useParams } from 'react-router-dom'

import { JServerToDoItem, JServerToDoList } from './components'

export const JServerToDo = () => {
	const { id } = useParams()
	return id ? <JServerToDoItem /> : <JServerToDoList />
}
