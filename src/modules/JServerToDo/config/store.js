const initialState = {
	list: [],
	filteredList: [],
	isLoading: false,
	isSorted: false,
	isEditing: false,
	selectedTodo: null,
	filterText: ''
}

export const todoReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'SET_LIST': {
			return {
				...state,
				list: payload || []
			}
		}

		case 'SET_FILTERED_LIST': {
			return {
				...state,
				filteredList: payload || []
			}
		}

		case 'SET_LOADING': {
			return {
				...state,
				isLoading: payload ?? !state.isLoading
			}
		}

		case 'SET_SORTING': {
			return {
				...state,
				isSorted: payload ?? !state.isSorted
			}
		}

		case 'SET_EDITING': {
			return {
				...state,
				isEditing: payload ?? !state.isSorted
			}
		}

		case 'SET_SELECTED_TODO': {
			return {
				...state,
				selectedTodo: payload
			}
		}

		case 'SET_FILTER_TEXT': {
			return {
				...state,
				filterText: payload || ''
			}
		}

		default:
			return state
	}
}

export const selectFieldByKey = key => state => state.todo[key]
