import { set } from 'firebase/database'
import { getDbRef, TABLES } from '../../../firebase'

export const useEditTodo = ({ setIsLoading }) => {
	const editTodo = async ({ id, completed, title: prevTitle }) => {
		const title = prompt('Enter new text', prevTitle)
		if (!title) return

		setIsLoading(true)

		set(getDbRef(`${TABLES.TODO}/${id}`), {
			completed,
			title,
			dt: Date.now()
		}).finally(() => setIsLoading(false))
	}

	return { editTodo }
}
