import { PATCH } from '../../../api'
import { setLoading } from '../config/actions'

export const useToggleCompletedTodo = ({
	callback,
	getTodoList,
	url,
	dispatch
}) => {
	const toggleCompletedTodo = async ({ id, completed }) => {
		try {
			dispatch(setLoading(true))
			await PATCH(`${url}/${id}`, { completed: !completed })
		} catch (e) {
			throw new Error(e)
		} finally {
			dispatch(setLoading(false))
			getTodoList && getTodoList()
			callback && callback()
		}
	}

	return { toggleCompletedTodo }
}
