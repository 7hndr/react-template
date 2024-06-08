import { useSelector, useDispatch } from 'react-redux'
import { useContext } from 'react'
import { Button } from '../../../../ui'

import { FaRegTimesCircle } from 'react-icons/fa'

import { todoItemContext } from '../../context'
import { selectFieldByKey } from '../../config/store'
import { deleteTodoItem } from '../../config/actions'

export const JServerTodoItemControls = () => {
	const { goToList } = useContext(todoItemContext)
	const dispatch = useDispatch()
	const selectedTodo = useSelector(selectFieldByKey('selectedTodo'))

	return (
		<Button
			simple
			onClick={() => dispatch(deleteTodoItem(selectedTodo, goToList))}
		>
			<FaRegTimesCircle />
		</Button>
	)
}
