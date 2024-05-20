import { WIN_PATTERNS } from '../config'

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

export const getMissingIndexToWin = (field, playerId) => {
	const emptyIndexList = getEmptyIndexList(field)
	let targetIndex = null
	let i = 0

	while (!Number.isInteger(targetIndex)) {
		const pattern = WIN_PATTERNS[i]

		let opponentMatchedIndexCount = 0
		const opponentNeededToWin = []

		pattern.forEach(i => {
			if (field[i] === playerId) {
				opponentMatchedIndexCount++
			} else {
				opponentNeededToWin.push(i)
			}
		})

		if (
			opponentMatchedIndexCount === 2 &&
			emptyIndexList.includes(opponentNeededToWin[0])
		) {
			targetIndex = opponentNeededToWin[0]
		} else if (i < WIN_PATTERNS.length - 1) {
			i++
		} else break
	}

	return targetIndex
}
