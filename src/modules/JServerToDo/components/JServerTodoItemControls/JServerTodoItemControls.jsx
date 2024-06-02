import { useContext } from 'react'
import { useSelector } from 'react-redux'

import { Button } from '../../../../ui'

import { FaRegTimesCircle } from 'react-icons/fa'

import { todoItemContext } from '../../context'
import { selectFieldByKey } from '../../config/store'

export const JServerTodoItemControls = () => {
	const selectedTodo = useSelector(selectFieldByKey('selectedTodo'))
	const { deleteTodo } = useContext(todoItemContext)

	return (
		<Button
			simple
			onClick={() => deleteTodo(selectedTodo)}
		>
			<FaRegTimesCircle />
		</Button>
	)
}
