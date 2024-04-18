import { PUT } from '../../../api'

export const useEditTodo = ({ getTodoList, url, setIsLoading }) => {
	const editTodo = async ({ id, completed, title: prevTitle }) => {
		const title = prompt('Enter new text', prevTitle)
		if (!title) return

		try {
			setIsLoading(true)
			await PUT(`${url}/${id}`, { completed, title, dt: Date.now() })
		} catch (e) {
			throw new Error(e)
		} finally {
			setIsLoading(false)
			getTodoList()
		}
	}

	return { editTodo }
}
