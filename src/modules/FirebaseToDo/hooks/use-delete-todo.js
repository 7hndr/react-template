import { remove } from 'firebase/database'
import { getDbRef, TABLES } from '../../../firebase'

export const useDeleteTodo = ({ setIsLoading }) => {
	const deleteTodo = async ({ id }) => {
		setIsLoading(true)

		remove(getDbRef(`${TABLES.TODO}/${id}`)).then(() => setIsLoading(false))
	}

	return { deleteTodo }
}
