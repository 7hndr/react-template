import { update } from 'firebase/database'
import { getDbRef, TABLES } from '../../../firebase'

export const useToggleCompletedTodo = ({ setIsLoading }) => {
	const toggleCompletedTodo = async ({ id, completed }) => {
		setIsLoading(true)

		update(getDbRef(`${TABLES.TODO}/${id}`), {
			completed: !completed
		}).finally(() => setIsLoading(false))
	}

	return { toggleCompletedTodo }
}
