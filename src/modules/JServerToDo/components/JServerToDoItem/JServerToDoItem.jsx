import styles from './JServerToDoItem.module.scss'

import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import {
	JServerTodoItemCheckbox,
	JServerTodoItemControls,
	JServerTodoItemHeader,
	JServerTodoItemForm,
	JServerTodoItemInfo
} from '../'
import { useGetTodoItem } from '../../hooks'
import { Divider } from '../../../../ui'
import { todoItemContext } from '../../context'

const TODO_URL = 'http://localhost:3004/todos'

import { useEditTodo, useDeleteTodo, useToggleCompletedTodo } from '../../hooks'

export const JServerToDoItem = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [editState, setEditState] = useState(false)
	const [todoItem, setTodoItem] = useState(null)

	const { id } = useParams()

	const navigate = useNavigate()

	const goToList = () => navigate('..')

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

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	const Loader = () => <span>Loading...</span>
	const UnknownId = () => <span>There is no Todo item with this id</span>

	return isLoading ? (
		<Loader />
	) : !todoItem ? (
		<UnknownId />
	) : (
		<todoItemContext.Provider
			value={{
				todoItem,
				todoChangeFieldHandler,
				toggleCompletedTodo,
				todoSaveHandler,
				setEditState,
				deleteTodo,
				goToList
			}}
		>
			<div className={styles.container}>
				<JServerTodoItemHeader />
				<div className={styles.todoBody}>
					<JServerTodoItemCheckbox />

					<Divider vertical />

					{editState ? (
						<JServerTodoItemForm />
					) : (
						<JServerTodoItemInfo />
					)}
					<JServerTodoItemControls />
				</div>
			</div>
		</todoItemContext.Provider>
	)
}
