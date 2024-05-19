import { initialState } from './'

export const reducer = (state = initialState, action) => {
	if (action?.field) {
		const { payload, field } = action

		return {
			...state,
			[field]: payload
		}
	} else {
		return state
	}
}
