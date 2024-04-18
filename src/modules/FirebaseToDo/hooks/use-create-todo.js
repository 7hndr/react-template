import { push } from 'firebase/database'
import { getDbRef, TABLES } from '../../../firebase'

export const useCreateTodo = ({ setIsLoading }) => {
	const createTodo = async () => {
		const title = prompt('Enter text')

		if (title) {
			setIsLoading(true)
			return push(getDbRef(TABLES.TODO), {
				title,
				dt: Date.now(),
				completed: false
			})
				.catch(e => {
					throw new Error(e)
				})
				.finally(() => setIsLoading(false))
		}
	}

	return { createTodo }
}
