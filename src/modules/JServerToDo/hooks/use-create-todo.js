import { POST } from '../../../api'

export const useCreateTodo = ({ getTodoList, url, setIsLoading }) => {
	const createTodo = async () => {
		try {
			const title = prompt('Enter title')
			if (!title) return
			const description = prompt('Enter description (not required)')

			setIsLoading(true)
			await POST(url, {
				title,
				description,
				completed: false,
				dt: Date.now()
			})
		} catch (e) {
			throw new Error(e)
		} finally {
			setIsLoading(false)
			getTodoList && getTodoList()
		}
	}

	return { createTodo }
}
