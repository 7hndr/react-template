import {
	FaRegCircle,
	FaRegCheckCircle,
	FaSortAlphaDown,
	FaPlus
} from 'react-icons/fa'

import {
	sortByField,
	debounce,
	parseTimeStampToDate
} from '../../../../helpers'

import styles from './JServerToDoList.module.scss'
import { Button, Input } from '../../../../ui'
import { useState, useEffect, useRef } from 'react'

import {
	useCreateTodo,
	useGetTodoList,
	useToggleCompletedTodo
} from '../../hooks'

import { NavLink } from 'react-router-dom'

const TODO_URL = 'http://localhost:3004/todos'

export const JServerToDoList = () => {
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

	const { createTodo } = useCreateTodo(hooksArgs)
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
		<>
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
