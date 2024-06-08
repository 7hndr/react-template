import styles from './JServerToDoItem.module.scss'

import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import {
	JServerTodoItemCheckbox,
	JServerTodoItemControls,
	JServerTodoItemHeader,
	JServerTodoItemForm,
	JServerTodoItemInfo
} from '../'

import { Divider } from '../../../../ui'

import { todoItemContext } from '../../context'
import { selectFieldByKey } from '../../config/store'
import { setTodoItem } from '../../config/actions'

export const JServerToDoItem = () => {
	const dispatch = useDispatch()

	const isLoading = useSelector(selectFieldByKey('isLoading'))
	const isEditing = useSelector(selectFieldByKey('isEditing'))
	const selectedTodo = useSelector(selectFieldByKey('selectedTodo'))

	const { id } = useParams()

	const navigate = useNavigate()

	const goToList = () => navigate('..')

	useEffect(() => {
		dispatch(setTodoItem(id))
	}, [dispatch, id])

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
