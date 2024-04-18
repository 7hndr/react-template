import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa'
import styles from './JPToDo.module.scss'
import { GET } from '../../api'
import { useState, useEffect } from 'react'
import { Input } from '../../ui'
import { debounce } from '../../helpers'

const TODO_URL = 'https://jsonplaceholder.typicode.com/todos'

export const JPToDo = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [originTodoList, setOriginTodoList] = useState([])
	const [filteredTodoList, setFilteredTodoList] = useState(originTodoList)

	useEffect(() => {
		GET(TODO_URL)
			.then(data => {
				setOriginTodoList(data)
				setFilteredTodoList(data)
			})
			.finally(() => setIsLoading(false))
	}, [])

	const onSearchChange = debounce(({ target }) => {
		if (target.value) {
			setFilteredTodoList(
				originTodoList.filter(item =>
					item.title
						.toLowerCase()
						.includes(target.value.toLowerCase())
				)
			)
		} else {
			setFilteredTodoList(originTodoList)
		}
	}, 256)

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>ToDo list</h2>
				<Input
					placeholder='Search'
					onChange={onSearchChange}
				/>
			</div>
			{filteredTodoList.length ? (
				<ul className={styles.list}>
					{filteredTodoList.map(todo => (
						<li
							className={`${styles.listItem} ${
								todo.completed && styles.listItemActive
							}`}
							key={todo.id}
						>
							{todo.completed ? (
								<FaRegCheckCircle />
							) : (
								<FaRegCircle />
							)}
							<span>{todo.title}</span>
						</li>
					))}
				</ul>
			) : (
				<span className={styles.noData}>
					{isLoading ? 'loading...' : 'There is no items'}
				</span>
			)}
		</div>
	)
}
