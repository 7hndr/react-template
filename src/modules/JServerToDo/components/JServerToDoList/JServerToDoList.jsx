import styles from './JServerToDoList.module.scss'

import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
	FaRegCircle,
	FaRegCheckCircle,
	FaSortAlphaDown,
	FaPlus
} from 'react-icons/fa'
import { Button, Input } from '../../../../ui'

import {
	sortByField,
	debounce,
	parseTimeStampToDate
} from '../../../../helpers'

import { selectFieldByKey } from '../../config/store'
import {
	useCreateTodo,
	useGetTodoList,
	useToggleCompletedTodo
} from '../../hooks'
import {
	setSorting,
	setFilterText,
	setFilteredList
} from '../../config/actions'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

const TODO_URL = 'http://localhost:3004/todos'

export const JServerToDoList = () => {
	const dispatch = useDispatch()

	const originTodoList = useSelector(selectFieldByKey('list'))
	const isLoading = useSelector(selectFieldByKey('isLoading'))
	const isSorted = useSelector(selectFieldByKey('isSorted'))
	const filterText = useSelector(selectFieldByKey('filterText'))
	const filteredList = useSelector(selectFieldByKey('filteredList'))

	const searchRef = useRef()

	const onSearchChange = debounce(({ target }) => {
		dispatch(setFilterText(target.value.toLowerCase()))
	}, 256)

	const sortClickHandler = () => {
		dispatch(setSorting(!isSorted))
	}

	const { getTodoList } = useGetTodoList({
		url: TODO_URL,
		dispatch
	})

	const hooksArgs = { url: TODO_URL, getTodoList, dispatch }

	const { createTodo } = useCreateTodo(hooksArgs)
	const { toggleCompletedTodo } = useToggleCompletedTodo(hooksArgs)

	useEffect(() => {
		if (filterText) {
			dispatch(
				setFilteredList(
					originTodoList.filter(item =>
						item.title.toLowerCase().includes(filterText)
					)
				)
			)
		} else {
			dispatch(setFilteredList(originTodoList))
		}
	}, [originTodoList, filterText, dispatch])

	return (
		<>
			{}
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
				{filteredList.length ? (
					isLoading ? (
						<span className={styles.noData}>loading...</span>
					) : (
						<ul className={styles.list}>
							{sortByField(
								filteredList,
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
										<NavLink
											className={styles.listItemTitle}
											to={`${todo.id}`}
										>
											{todo.title}
										</NavLink>
										{/* favorite ? "★" : "☆" */}
										<span className={styles.listItemDt}>
											{parseTimeStampToDate(todo.dt)}
										</span>
									</div>
								</li>
							))}
						</ul>
					)
				) : (
					<span className={styles.noData}>There is no items</span>
				)}
			</div>
		</>
	)
}
