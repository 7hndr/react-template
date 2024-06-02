import styles from './JServerTodoItemInfo.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '../../../../ui'
import { FaRegEdit } from 'react-icons/fa'

import { setEditing } from '../../config/actions'
import { selectFieldByKey } from '../../config/store'

export const JServerTodoItemInfo = () => {
	const dispatch = useDispatch()
	const selectedTodo = useSelector(selectFieldByKey('selectedTodo'))

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>{selectedTodo.title}</h1>
			<p className={styles.desc}>{selectedTodo.description}</p>
			<Button
				className={styles.controls}
				simple
				onClick={() => dispatch(setEditing(true))}
			>
				<FaRegEdit />
			</Button>
		</div>
	)
}
