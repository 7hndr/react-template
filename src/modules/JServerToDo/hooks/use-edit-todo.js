import { PUT } from '../../../api'
import { setLoading } from '../config/actions'

export const useEditTodo = ({ callback, getTodoList, url, dispatch }) => {
	const editTodo = async ({ ...todo }) => {
		try {
			dispatch(setLoading(true))

			await PUT(`${url}/${todo.id}`, { ...todo, dt: Date.now() })
		} catch (e) {
			throw new Error(e)
		} finally {
			dispatch(setLoading(false))

			getTodoList && getTodoList()
			callback && callback()
		}
	}

	return { editTodo }
}
