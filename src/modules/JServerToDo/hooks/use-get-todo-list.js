import { useCallback, useEffect } from 'react'
import { GET } from '../../../api'

export const useGetTodoList = ({ setData, url, setIsLoading }) => {
	const getTodoList = useCallback(() => {
		setIsLoading(true)
		GET(url)
			.then(data => setData(data || []))
			.catch(e => {
				throw new Error(e)
			})
			.finally(() => setIsLoading(false))
	}, [setData, url, setIsLoading])

	useEffect(() => {
		getTodoList()
	}, [getTodoList])

	return { getTodoList }
}
