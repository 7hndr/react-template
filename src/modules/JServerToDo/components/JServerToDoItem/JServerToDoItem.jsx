import styles from './JServerToDoItem.module.scss'

import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
	JServerTodoItemCheckbox,
	JServerTodoItemControls,
	JServerTodoItemHeader,
	JServerTodoItemForm,
	JServerTodoItemInfo
} from '../'

import { Divider } from '../../../../ui'

import { useGetTodoItem } from '../../hooks'
import { todoItemContext } from '../../context'
import { selectFieldByKey } from '../../config/store'
import { setEditing, setSelected } from '../../config/actions'
import { useEditTodo, useDeleteTodo, useToggleCompletedTodo } from '../../hooks'

const TODO_URL = 'http://localhost:3004/todos'

export const JServerToDoItem = () => {
	const dispatch = useDispatch()

	const isLoading = useSelector(selectFieldByKey('isLoading'))
	const isEditing = useSelector(selectFieldByKey('isEditing'))
	const selectedTodo = useSelector(selectFieldByKey('selectedTodo'))

	const { id } = useParams()

	const navigate = useNavigate()

	const goToList = () => navigate('..')

	const hooksArgs = { url: TODO_URL, dispatch }

	const { getTodoItem } = useGetTodoItem({
		...hooksArgs,
		id
	})

	const { editTodo } = useEditTodo({
		...hooksArgs,
		callback: getTodoItem,
		dispatch
	})

	const { deleteTodo } = useDeleteTodo({ ...hooksArgs, callback: goToList })

	const { toggleCompletedTodo } = useToggleCompletedTodo({
		...hooksArgs,
		callback: getTodoItem
	})

	const todoChangeFieldHandler = ({ target }) => {
		dispatch(setSelected({ ...selectedTodo, [target.name]: target.value }))
	}

	const todoSaveHandler = () => {
		editTodo(selectedTodo).then(() => {
			dispatch(setEditing(false))
		})
	}

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	const Loader = () => <span>Loading...</span>
	const UnknownId = () => <span>There is no Todo item with this id</span>

	return isLoading ? (
		<Loader />
	) : !selectedTodo ? (
		<UnknownId />
	) : (
		<todoItemContext.Provider
			value={{
				todoChangeFieldHandler,
				toggleCompletedTodo,
				todoSaveHandler,
				deleteTodo,
				goToList
			}}
		>
			<div className={styles.container}>
				<JServerTodoItemHeader />
				<div className={styles.todoBody}>
					<JServerTodoItemCheckbox />

					<Divider vertical />

					{isEditing ? (
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
