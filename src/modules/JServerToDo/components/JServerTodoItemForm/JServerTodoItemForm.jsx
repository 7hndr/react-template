import styles from './JServerTodoItemForm.module.scss'

import { useContext } from 'react'
import { useSelector } from 'react-redux'

import { todoItemContext } from '../../context'

import { FaRegSave } from 'react-icons/fa'

import { Input, Button } from '../../../../ui'

import { selectFieldByKey } from '../../config/store'

export const JServerTodoItemForm = () => {
	const selectedTodo = useSelector(selectFieldByKey('selectedTodo'))

	const { todoChangeFieldHandler, todoSaveHandler } =
		useContext(todoItemContext)

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
				onClick={todoSaveHandler}
			>
				<FaRegSave />
			</Button>
		</div>
	)
}
