import { useSelector, useDispatch } from 'react-redux'

import { Button } from '../../../../ui'

import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa'
import { selectFieldByKey } from '../../config/store'

import { toggleIsCompletedTodoItem } from '../../config/actions'

export const JServerTodoItemCheckbox = () => {
	const dispatch = useDispatch()
	const selectedTodo = useSelector(selectFieldByKey('selectedTodo'))

	return (
		<Button
			simple
			onClick={() => dispatch(toggleIsCompletedTodoItem(selectedTodo))}
		>
			{selectedTodo.completed ? <FaRegCheckCircle /> : <FaRegCircle />}
		</Button>
	)
}
