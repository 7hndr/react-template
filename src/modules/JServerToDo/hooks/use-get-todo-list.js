import { useCallback, useEffect } from 'react'
import { GET } from '../../../api'
import { setList, setLoading } from '../config/actions'

export const useGetTodoList = ({ url, dispatch }) => {
	const getTodoList = useCallback(async () => {
		try {
			dispatch(setLoading(true))

			const data = await GET(url)
			dispatch(setList(data))
		} catch (e) {
			throw new Error(e)
		} finally {
			dispatch(setLoading(false))
		}
	}, [url, dispatch])

	useEffect(() => {
		getTodoList()
	}, [getTodoList])

	return { getTodoList }
}
