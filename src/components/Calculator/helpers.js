export const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n)

export const getArrWithModifedLastEl = (arr, lastEl) =>
	arr.toSpliced(arr.length - 1, 1, lastEl)

export const calcResult = expressionArr => {
	const parseFirstPair = arr => {
		const [firstOperand, operator, secondOperand, ...rest] = arr

		if (!(isNumber(firstOperand) && isNumber(secondOperand))) return arr[0]

		switch (operator) {
			case '+':
				return parseFirstPair([firstOperand + secondOperand, ...rest])
			case '-':
				return parseFirstPair([firstOperand - secondOperand, ...rest])
			default:
				return arr[0]
		}
	}

	return parseFirstPair(expressionArr)
}
