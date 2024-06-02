import styles from './JServerTodoItemHeader.module.scss'

import { useContext } from 'react'
import { useSelector } from 'react-redux'

import { Button } from '../../../../ui'
import { FaArrowLeft } from 'react-icons/fa'

import { todoItemContext } from '../../context'
import { selectFieldByKey } from '../../config/store'
import { parseTimeStampToDate } from '../../../../helpers'

export const JServerTodoItemHeader = () => {
	const selectedTodo = useSelector(selectFieldByKey('selectedTodo'))

	const { goToList } = useContext(todoItemContext)

	return (
		<div className={styles.header}>
			<Button
				simple
				className={styles.backButton}
				onClick={() => goToList()}
			>
				<FaArrowLeft />
				Go back
			</Button>
			<span className={styles.dt}>
				{parseTimeStampToDate(selectedTodo.dt)}
			</span>
		</div>
	)
}
