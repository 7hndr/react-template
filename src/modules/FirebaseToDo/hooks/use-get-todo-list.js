import { useCallback, useEffect } from 'react'
import { onValue } from 'firebase/database'
import { getDbRef, TABLES } from '../../../firebase'

export const useGetTodoList = ({ setData, setIsLoading }) => {
	const getTodoList = useCallback(() => {
		setIsLoading(true)

		return onValue(getDbRef(TABLES.TODO), snapshot => {
			const todoList = Object.entries(snapshot.val()).map(
				([id, body]) => ({
					id,
					...body
				})
			)
			setData(todoList)
			setIsLoading(false)
		})
	}, [setData, setIsLoading])

	useEffect(getTodoList, [getTodoList])

	return { getTodoList }
}
