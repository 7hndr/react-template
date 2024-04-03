import { useState } from 'react'

export const useForm = ({ initialState }) => {
	const [form, setForm] = useState(initialState)

	const onChange = ({ target }) => {
		const { name, value } = target

		setForm({ ...form, [name]: value })
	}

	const clearForm = () => setForm(initialState)

	return { form, onChange, clearForm }
}
