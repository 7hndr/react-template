import { useContext } from 'react'
import { todoItemContext } from '../../context'

import { Button } from '../../../../ui'
import { FaRegTimesCircle } from 'react-icons/fa'

export const JServerTodoItemControls = () => {
	const { deleteTodo, todoItem } = useContext(todoItemContext)

	return (
		<Button
			simple
			onClick={() => deleteTodo(todoItem)}
		>
			<FaRegTimesCircle />
		</Button>
	)
}
