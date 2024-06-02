import { POST } from '../../../api'
import { setLoading } from '../config/actions'

export const useCreateTodo = ({ getTodoList, url, dispatch }) => {
	const createTodo = async () => {
		try {
			const title = prompt('Enter title')
			if (!title) return
			const description = prompt('Enter description (not required)')

			dispatch(setLoading(true))
			await POST(url, {
				title,
				description,
				completed: false,
				dt: Date.now()
			})
		} catch (e) {
			throw new Error(e)
		} finally {
			dispatch(setLoading(false))
			getTodoList && getTodoList()
		}
	}

	return { createTodo }
}
