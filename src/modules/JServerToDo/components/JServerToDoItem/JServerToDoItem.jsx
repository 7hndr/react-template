import {
	FaRegCircle,
	FaRegCheckCircle,
	FaRegTimesCircle,
	FaRegEdit,
	FaRegSave,
	FaArrowLeft
} from 'react-icons/fa'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetTodoItem } from '../../hooks'
import styles from './JServerToDoItem.module.scss'
import { Button, Input, Divider } from '../../../../ui'

import { parseTimeStampToDate } from '../../../../helpers'

const TODO_URL = 'http://localhost:3004/todos'

import { useEditTodo, useDeleteTodo, useToggleCompletedTodo } from '../../hooks'

export const JServerToDoItem = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [editState, setEditState] = useState(false)
	const [todoItem, setTodoItem] = useState(null)

	const { id } = useParams()

	const navigate = useNavigate()

	const goToList = () => {
		navigate('.')
	}

	const hooksArgs = { url: TODO_URL, setIsLoading }

	const { getTodoItem } = useGetTodoItem({
		id,
		setData: setTodoItem,
		url: TODO_URL,
		setIsLoading
	})

	const { editTodo } = useEditTodo({
		...hooksArgs,
		callback: getTodoItem
	})
	const { deleteTodo } = useDeleteTodo({ ...hooksArgs, callback: goToList })
	const { toggleCompletedTodo } = useToggleCompletedTodo({
		...hooksArgs,
		callback: getTodoItem
	})

	const todoChangeFieldHandler = ({ target }) => {
		setTodoItem({ ...todoItem, [target.name]: target.value })
	}

	const todoSaveHandler = () => {
		editTodo(todoItem).then(() => {
			setEditState(false)
		})
	}

	// TODO: upg below with external components
	const Loader = () => <span>Loading...</span>
	const UnknownId = () => (
		<>
			<Button
				className={styles.listItemCheckbox}
				simple
				onClick={() => goToList()}
			>
				<FaArrowLeft />
				Go back
			</Button>
			<span>There is no Todo item with this id</span>
		</>
	)

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //
	return isLoading ? (
		<Loader />
	) : !todoItem ? (
		<UnknownId />
	) : (
		<div className={styles.container}>
			<div className={styles.header}>
				<Button
					className={styles.listItemCheckbox}
					simple
					onClick={() => goToList()}
				>
					<FaArrowLeft />
					Go back
				</Button>
				<span className={styles.listItemDt}>
					{parseTimeStampToDate(todoItem.dt)}
				</span>
			</div>
			<div className={styles.todoBody}>
				<Button
					className={styles.listItemCheckbox}
					simple
					onClick={() => toggleCompletedTodo(todoItem)}
				>
					{todoItem.completed ? (
						<FaRegCheckCircle />
					) : (
						<FaRegCircle />
					)}
				</Button>
				<Divider vertical />
				<div className={styles.info}>
					{editState ? (
						<>
							<Input
								className={styles.infoTitle}
								value={todoItem.title}
								name='title'
								label='Title'
								onChange={todoChangeFieldHandler}
							/>
							<Input
								className={styles.infoDescription}
								value={todoItem.description}
								name='description'
								label='Description'
								onChange={todoChangeFieldHandler}
							/>
							<Button
								className={styles.infoControls}
								simple
								onClick={todoSaveHandler}
							>
								<FaRegSave />
							</Button>
						</>
					) : (
						<>
							<h1 className={styles.infoTitle}>
								{todoItem.title}
							</h1>
							<p className={styles.infoDesc}>
								{todoItem.description}
							</p>
							<Button
								className={styles.infoControls}
								simple
								onClick={() => setEditState(true)}
							>
								<FaRegEdit />
							</Button>
						</>
					)}
				</div>
				<Button
					simple
					onClick={() => deleteTodo(todoItem)}
				>
					<FaRegTimesCircle />
				</Button>
			</div>
		</div>
	)
}
