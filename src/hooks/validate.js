export const useValidate = ({ schema, form, rules }) => {
	const getErrors = () => {
		const errors = {}

		for (const field in form) {
			const value = form[field]
			const fieldSchema = schema[field]
			errors[field] = []

			for (const condition in fieldSchema) {
				const isValid = rules[condition](
					value,
					fieldSchema[condition].arg,
					form
				)

				errors[field] = !isValid
					? [...errors[field], fieldSchema[condition].message]
					: errors[field]
			}
		}
		return errors
	}
	const hasNoErrors = errorObj => !Object.values(errorObj).flat().length

	const isFormValid = () => hasNoErrors(getErrors())

	return { getErrors, isFormValid }
}
