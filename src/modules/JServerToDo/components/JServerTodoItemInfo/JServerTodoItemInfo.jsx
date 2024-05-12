import { useContext } from 'react'
import { todoItemContext } from '../../context'

import styles from './JServerTodoItemInfo.module.scss'
import { FaRegEdit } from 'react-icons/fa'
import { Button } from '../../../../ui'

export const JServerTodoItemInfo = () => {
	const { todoItem, setEditState } = useContext(todoItemContext)

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>{todoItem.title}</h1>
			<p className={styles.desc}>{todoItem.description}</p>
			<Button
				className={styles.controls}
				simple
				onClick={() => setEditState(true)}
			>
				<FaRegEdit />
			</Button>
		</div>
	)
}
