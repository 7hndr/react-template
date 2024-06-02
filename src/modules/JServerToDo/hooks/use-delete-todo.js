import { DELETE } from '../../../api'
import { setLoading } from '../config/actions'

export const useDeleteTodo = ({ getTodoList, url, dispatch, callback }) => {
	const deleteTodo = async ({ id }) => {
		if (!confirm('Are you sure to want delete this ToDo?')) return

		try {
			dispatch(setLoading(true))
			await DELETE(`${url}/${id}`)
		} catch (e) {
			throw new Error(e)
		} finally {
			dispatch(setLoading(false))
			getTodoList && getTodoList()
			callback && callback()
		}
	}

	return { deleteTodo }
}
