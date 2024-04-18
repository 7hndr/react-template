export const debounce = (cb, d) => {
	let t

	return function (...args) {
		clearTimeout(t)

		const ctx = this

		t = setTimeout(() => {
			cb.call(ctx, ...args)
		}, d)
	}
}

export const sortByField = (array, field) => {
	return [...array].sort((a, b) => {
		switch (typeof a[field]) {
			case 'string':
				return a[field].localeCompare(b[field], 'en')

			default:
				return a > b
		}
	})
}

export const parseTimeStampToDate = ts => {
	if (!ts) return '—'

	return new Intl.DateTimeFormat('ru-RU', {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	}).format(new Date(ts))
}
