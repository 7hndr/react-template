import { useContext } from 'react'
import { todoItemContext } from '../../context'

import styles from './JServerTodoItemForm.module.scss'
import { FaRegSave } from 'react-icons/fa'
import { Input, Button } from '../../../../ui'

export const JServerTodoItemForm = () => {
	const { todoItem, todoChangeFieldHandler, todoSaveHandler } =
		useContext(todoItemContext)

	return (
		<div className={styles.wrapper}>
			<Input
				className={styles.title}
				value={todoItem.title}
				name='title'
				label='Title'
				onChange={todoChangeFieldHandler}
			/>
			<Input
				className={styles.desc}
				value={todoItem.description}
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
