import { DELETE } from '../../../api'

export const useDeleteTodo = ({ getTodoList, url, setIsLoading, callback }) => {
	const deleteTodo = async ({ id }) => {
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
