import { PUT } from '../../../api'

export const useEditTodo = ({ callback, getTodoList, url, setIsLoading }) => {
	const editTodo = async ({ ...todo }) => {
		try {
			setIsLoading(true)
			await PUT(`${url}/${todo.id}`, { ...todo, dt: Date.now() })
		} catch (e) {
			throw new Error(e)
		} finally {
			setIsLoading(false)
			getTodoList && getTodoList()
			callback && callback()
		}
	}

	return { editTodo }
}
