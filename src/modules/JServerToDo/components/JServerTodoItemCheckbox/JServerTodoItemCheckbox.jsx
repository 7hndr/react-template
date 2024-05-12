import { useContext } from 'react'
import { todoItemContext } from '../../context'

import { Button } from '../../../../ui'
import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa'

export const JServerTodoItemCheckbox = () => {
	const { toggleCompletedTodo, todoItem } = useContext(todoItemContext)

	return (
		<Button
			simple
			onClick={() => toggleCompletedTodo(todoItem)}
		>
			{todoItem.completed ? <FaRegCheckCircle /> : <FaRegCircle />}
		</Button>
	)
}
