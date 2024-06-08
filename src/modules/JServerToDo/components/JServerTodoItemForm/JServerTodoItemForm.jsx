import styles from './JServerTodoItemForm.module.scss'

import { useSelector, useDispatch } from 'react-redux'

import { FaRegSave } from 'react-icons/fa'

import { Input, Button } from '../../../../ui'

import { selectFieldByKey } from '../../config/store'
import { updateTodoItem, setSelected } from '../../config/actions'

export const JServerTodoItemForm = () => {
	const dispatch = useDispatch()
	const selectedTodo = useSelector(selectFieldByKey('selectedTodo'))

	const todoChangeFieldHandler = ({ target }) => {
		dispatch(setSelected({ ...selectedTodo, [target.name]: target.value }))
	}

	return (
		<div className={styles.wrapper}>
			<Input
				className={styles.title}
				value={selectedTodo.title}
				name='title'
				label='Title'
				onChange={todoChangeFieldHandler}
			/>
			<Input
				className={styles.desc}
				value={selectedTodo.description}
				name='description'
				label='Description'
				onChange={todoChangeFieldHandler}
			/>
			<Button
				className={styles.controls}
				simple
				onClick={() => dispatch(updateTodoItem(selectedTodo))}
			>
				<FaRegSave />
			</Button>
		</div>
	)
}
