import { GET, PUT, POST, DELETE } from '../../../api'
import { TODO_URL } from '../config'

export const setLoading = payload => ({
	type: 'SET_LOADING',
	payload
})

export const setList = payload => ({
	type: 'SET_LIST',
	payload
})

export const setSorting = payload => ({
	type: 'SET_SORTING',
	payload
})

export const setEditing = payload => ({
	type: 'SET_EDITING',
	payload
})

export const setSelected = payload => ({
	type: 'SET_SELECTED_TODO',
	payload
})

export const setFilterText = payload => ({
	type: 'SET_FILTER_TEXT',
	payload
})

export const setFilteredList = payload => ({
	type: 'SET_FILTERED_LIST',
	payload
})

export const setTodoList = () => {
	return dispatch => {
		dispatch(setLoading(true))

		GET(TODO_URL)
			.then(data =>
				dispatch({
					type: 'SET_LIST',
					payload: data
				})
			)
			.finally(dispatch(setLoading(false)))
			.catch(e => {
				throw new Error(e.message)
			})
	}
}

export const setTodoItem = id => {
	return dispatch => {
		dispatch(setLoading(true))

		GET(`${TODO_URL}/${id}`)
			.then(data =>
				dispatch({
					type: 'SET_SELECTED_TODO',
					payload: data
				})
			)
			.finally(dispatch(setLoading(false)))
			.catch(e => {
				throw new Error(e.message)
			})
	}
}

export const updateTodoItem = todo => dispatch => {
	dispatch(setLoading(true))

	PUT(`${TODO_URL}/${todo.id}`, { ...todo, dt: Date.now() })
		.then(data =>
			dispatch({
				type: 'SET_SELECTED_TODO',
				payload: data
			})
		)
		.finally(() => {
			dispatch(setLoading(false))
			dispatch(setEditing(false))
		})
		.catch(e => {
			throw new Error(e.message)
		})
}

export const toggleIsCompletedTodoItem = todo =>
	updateTodoItem({ ...todo, completed: !todo.completed, dt: Date.now() })

export const toggleIsCompletedTodoItemInList = todo => dispatch => {
	dispatch(setLoading(true))

	PUT(`${TODO_URL}/${todo.id}`, {
		...todo,
		completed: !todo.completed,
		dt: Date.now()
	})
		.then(() => dispatch(setTodoList()))
		.catch(e => {
			throw new Error(e.message)
		})
		.finally(() => {
			dispatch(setLoading(false))
		})
}

export const createTodoItem = () => dispatch => {
	dispatch(setLoading(true))

	const title = prompt('Enter title')
	if (!title) return
	const description = prompt('Enter description (not required)')

	POST(TODO_URL, {
		title,
		description,
		completed: false,
		dt: Date.now()
	})
		.then(() => dispatch(setTodoList()))
		.finally(() => {
			dispatch(setLoading(false))
			dispatch(setEditing(false))
		})
		.catch(e => {
			throw new Error(e.message)
		})
}

export const deleteTodoItem = (todo, callback) => dispatch => {
	dispatch(setLoading(true))

	DELETE(`${TODO_URL}/${todo.id}`)
		.then(() => callback())
		.catch(e => {
			throw new Error(e.message)
		})
		.finally(() => {
			dispatch(setLoading(false))
			dispatch(setEditing(false))
		})
}
