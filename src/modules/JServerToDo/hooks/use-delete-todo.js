import { DELETE } from '../../../api'

export const useDeleteTodo = ({ getTodoList, url, setIsLoading, callback }) => {
	const deleteTodo = async ({ id }) => {
		if (!confirm('Are you sure to want delete this ToDo?')) return
		try {
			setIsLoading(true)
			await DELETE(`${url}/${id}`)
		} catch (e) {
			throw new Error(e)
		} finally {
			setIsLoading(false)
			getTodoList && getTodoList()
			callback && callback()
		}
	}

	return { deleteTodo }
}
