import { useCallback, useEffect } from 'react'
import { GET } from '../../../api'

export const useGetTodoItem = ({ id, setData, url, setIsLoading }) => {
	const getTodoItem = useCallback(() => {
		setIsLoading(true)

		GET(`${url}/${id}`)
			.then(data => setData(data || []))
			.catch(e => {
				throw new Error(e)
			})
			.finally(() => setIsLoading(false))
	}, [setData, url, setIsLoading, id])

	useEffect(() => {
		getTodoItem()
	}, [getTodoItem])

	return { getTodoItem }
}
