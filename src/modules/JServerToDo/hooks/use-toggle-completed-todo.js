import { PATCH } from '../../../api'

export const useToggleCompletedTodo = ({ getTodoList, url, setIsLoading }) => {
	const toggleCompletedTodo = async ({ id, completed }) => {
		try {
			setIsLoading(true)
			await PATCH(`${url}/${id}`, { completed: !completed })
		} catch (e) {
			throw new Error(e)
		} finally {
			setIsLoading(false)
			getTodoList()
		}
	}

	return { toggleCompletedTodo }
}
