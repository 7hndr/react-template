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
	setSorting,
	setTodoList,
	setFilterText,
	createTodoItem,
	setFilteredList,
	toggleIsCompletedTodoItemInList
} from '../../config/actions'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

export const JServerToDoList = () => {
	const dispatch = useDispatch()

	const isSorted = useSelector(selectFieldByKey('isSorted'))
	const isLoading = useSelector(selectFieldByKey('isLoading'))
	const originTodoList = useSelector(selectFieldByKey('list'))
	const filterText = useSelector(selectFieldByKey('filterText'))
	const filteredList = useSelector(selectFieldByKey('filteredList'))

	const searchRef = useRef()

	const onSearchChange = debounce(({ target }) => {
		dispatch(setFilterText(target.value.toLowerCase()))
	}, 256)

	const sortClickHandler = () => {
		dispatch(setSorting(!isSorted))
	}

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

	useEffect(() => {
		dispatch(setTodoList())
	}, [dispatch])

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
						onClick={() => dispatch(createTodoItem())}
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
												dispatch(
													toggleIsCompletedTodoItemInList(
														todo
													)
												)
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
