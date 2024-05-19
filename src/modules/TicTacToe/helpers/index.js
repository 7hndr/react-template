export const randomInRange = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min

export const getEmptyIndexList = field => {
	return field.reduce((a, c, i) => (Number.isInteger(c) ? a : [...a, i]), [])
}

export const getRandomEmptyIndex = field => {
	const emptyList = getEmptyIndexList(field)
	const randomIndex = randomInRange(0, emptyList.length - 1)
	return emptyList[randomIndex]
}
