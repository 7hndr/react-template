export const GET = url => {
	return new Promise((resolve, reject) => {
		fetch(url, { method: 'GET' })
			.then(res => {
				if (res.status === 404) {
					reject(new Error('404'))
				} else {
					resolve(res.json())
				}
			})
			.catch(err => reject(err))
	})
}

export const DELETE = url => {
	return new Promise((resolve, reject) => {
		fetch(url, { method: 'DELETE' })
			.then(res => resolve(res.json()))
			.catch(err => reject(err))
	})
}

export const POST = (url, body) => {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => resolve(res.json()))
			.catch(err => reject(err))
	})
}

export const PUT = (url, body) => {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => resolve(res.json()))
			.catch(err => reject(err))
	})
}

export const PATCH = (url, body) => {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})
			.then(res => resolve(res.json()))
			.catch(err => reject(err))
	})
}
