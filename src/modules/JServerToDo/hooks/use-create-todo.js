import { POST } from '../../../api'

export const useCreateTodo = ({ getTodoList, url, setIsLoading }) => {
	const createTodo = async () => {
		try {
			const title = prompt('Enter text')
			if (!title) return

			setIsLoading(true)
			await POST(url, { title, completed: false, dt: Date.now() })
		} catch (e) {
			throw new Error(e)
		} finally {
			setIsLoading(false)
			getTodoList()
		}
	}

	return { createTodo }
}
