import {
	FaRegCircle,
	FaRegCheckCircle,
	FaRegTimesCircle,
	FaRegEdit,
	FaSortAlphaDown,
	FaPlus
} from 'react-icons/fa'
import styles from './JServerToDo.module.scss'
import { useState, useEffect, useRef } from 'react'
import { Button, Input } from '../../ui'

import { sortByField, debounce, parseTimeStampToDate } from '../../helpers'

import {
	useEditTodo,
	useCreateTodo,
	useDeleteTodo,
	useGetTodoList,
	useToggleCompletedTodo
} from './hooks'

const TODO_URL = 'http://localhost:3004/todos'

export const JServerToDo = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [isSorted, setIsSorted] = useState(false)
	const [filterText, setFilterText] = useState('')
	const [originTodoList, setOriginTodoList] = useState([])
	const [filteredTodoList, setFilteredTodoList] = useState(originTodoList)
	const searchRef = useRef()

	const onSearchChange = debounce(({ target }) => {
		setFilterText(target.value.toLowerCase())
	}, 256)

	const sortClickHandler = () => {
		setIsSorted(!isSorted)
	}

	const { getTodoList } = useGetTodoList({
		url: TODO_URL,
		setIsLoading,
		setData: setOriginTodoList
	})

	const hooksArgs = { url: TODO_URL, getTodoList, setIsLoading }

	const { editTodo } = useEditTodo(hooksArgs)
	const { createTodo } = useCreateTodo(hooksArgs)
	const { deleteTodo } = useDeleteTodo(hooksArgs)
	const { toggleCompletedTodo } = useToggleCompletedTodo(hooksArgs)

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	useEffect(() => {
		if (filterText) {
			setFilteredTodoList(
				originTodoList.filter(item =>
					item.title.toLowerCase().includes(filterText)
				)
			)
		} else {
			setFilteredTodoList(originTodoList)
		}
	}, [originTodoList, filterText])

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>ToDo</h2>
				<Input
					placeholder='Search'
					_ref={searchRef}
					onChange={onSearchChange}
				/>
				<Button
					square
					simple
					active={isSorted}
					onClick={sortClickHandler}
				>
					<FaSortAlphaDown />
				</Button>
				<Button
					square
					onClick={createTodo}
				>
					<FaPlus />
				</Button>
			</div>
			{filteredTodoList.length ? (
				isLoading ? (
					<span className={styles.noData}>loading...</span>
				) : (
					<ul className={styles.list}>
						{sortByField(
							filteredTodoList,
							isSorted ? 'title' : 'dt'
						).map(todo => (
							<li
								className={`${styles.listItem} ${
									todo.completed && styles.listItemActive
								}`}
								key={todo.id}
							>
								<div className={styles.listItemContent}>
									<Button
										className={styles.listItemCheckbox}
										simple
										onClick={() =>
											toggleCompletedTodo(todo)
										}
									>
										{todo.completed ? (
											<FaRegCheckCircle />
										) : (
											<FaRegCircle />
										)}
									</Button>
									<span className={styles.listItemTitle}>
										{todo.title}
									</span>
									<span className={styles.listItemDt}>
										{parseTimeStampToDate(todo.dt)}
									</span>
								</div>
								<div className={styles.listItemControls}>
									<Button
										simple
										onClick={() => deleteTodo(todo)}
									>
										<FaRegTimesCircle />
									</Button>
									<Button
										simple
										onClick={() => editTodo(todo)}
									>
										<FaRegEdit />
									</Button>
								</div>
							</li>
						))}
					</ul>
				)
			) : (
				<span className={styles.noData}>There is no items</span>
			)}
		</div>
	)
}
