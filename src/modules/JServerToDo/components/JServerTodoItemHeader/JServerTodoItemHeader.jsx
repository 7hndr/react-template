import styles from './JServerTodoItemHeader.module.scss'

import { useContext } from 'react'
import { todoItemContext } from '../../context'

import { Button } from '../../../../ui'
import { FaArrowLeft } from 'react-icons/fa'

import { parseTimeStampToDate } from '../../../../helpers'

export const JServerTodoItemHeader = () => {
	const { goToList, todoItem } = useContext(todoItemContext)

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
				{parseTimeStampToDate(todoItem.dt)}
			</span>
		</div>
	)
}
