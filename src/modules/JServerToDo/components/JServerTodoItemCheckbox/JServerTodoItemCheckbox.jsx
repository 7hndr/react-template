import { useContext } from 'react'
import { useSelector } from 'react-redux'

import { Button } from '../../../../ui'

import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa'
import { todoItemContext } from '../../context'
import { selectFieldByKey } from '../../config/store'

export const JServerTodoItemCheckbox = () => {
	const selectedTodo = useSelector(selectFieldByKey('selectedTodo'))

	const { toggleCompletedTodo } = useContext(todoItemContext)

	return (
		<Button
			simple
			onClick={() => toggleCompletedTodo(selectedTodo)}
		>
			{selectedTodo.completed ? <FaRegCheckCircle /> : <FaRegCircle />}
		</Button>
	)
}
