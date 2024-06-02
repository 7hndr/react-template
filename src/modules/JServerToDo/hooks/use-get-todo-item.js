import { useCallback, useEffect } from 'react'
import { GET } from '../../../api'
import { setSelected, setLoading } from '../config/actions'

export const useGetTodoItem = ({ id, url, dispatch }) => {
	const getTodoItem = useCallback(async () => {
		try {
			dispatch(setLoading(true))
			const data = await GET(`${url}/${id}`)
			dispatch(setSelected(data))
		} catch (e) {
			throw new Error(e)
		} finally {
			dispatch(setLoading(false))
		}
	}, [url, dispatch, id])

	useEffect(() => {
		getTodoItem()
	}, [getTodoItem])

	return { getTodoItem }
}
