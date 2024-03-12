import { useState } from 'react'
import styles from './Calculator.module.scss'

const buttons = [
	{ value: '1', type: 'number' },
	{ value: '2', type: 'number' },
	{ value: '3', type: 'number' },
	{ value: '4', type: 'number' },
	{ value: '5', type: 'number' },
	{ value: '6', type: 'number' },
	{ value: '7', type: 'number' },
	{ value: '8', type: 'number' },
	{ value: '9', type: 'number' },
	{ value: '0', type: 'number' },
	{ value: '.', type: 'decimal' },
	{ value: 'C', type: 'clear' },
	{ value: '+', type: 'operator' },
	{ value: '-', type: 'operator' },
	{ value: '=', type: 'equal' }
]

const splitString = expression => {
	const expressionString = String(expression).split('')
	const expArray = []
	let tempNumber = ''

	expressionString.forEach((char, i) => {
		const isOperator = buttons.find(
			({ value, type }) => type === 'operator' && value === char
		)

		if (isOperator) {
			if (tempNumber) {
				expArray.push(+tempNumber)
				tempNumber = ''
				expArray.push(char)
			} else {
				tempNumber += '-'
			}
		} else {
			tempNumber += char
		}
	})
	if (tempNumber) {
		expArray.push(+tempNumber)
	}

	return expArray
}

const calcResultFromExpressionArray = expString => {
	const expArray = splitString(expString)
	let result = expArray.length === 1 ? parseFloat(expArray[0]) : 0

	expArray.forEach((item, i) => {
		if (i > 1 && typeof expArray[i] === 'number') {
			const currentOperand = expArray[i]
			const prevOperand = expArray[i - 2]
			const prevOperator = expArray[i - 1]

			switch (prevOperator) {
				case '-':
					if (i === 2) {
						result += prevOperand - currentOperand
					} else {
						result -= currentOperand
					}
					break
				case '+':
					if (i === 2) {
						result += prevOperand + currentOperand
					} else {
						result += currentOperand
					}
					break
				default:
					break
			}
		}
	})

	return result
}

export const Calculator = () => {
	const [displayValue, setDisplayValue] = useState('')
	const [resultState, setResultState] = useState(false)

	const isButtonDisabled = ({ type }) => {
		switch (type) {
			case 'operator':
				return (
					typeof displayValue !== 'number' &&
					(displayValue.endsWith('+') || displayValue.endsWith('-'))
				)

			default:
				return false
		}
	}

	const handleButtonClick = ({ value, type }) => {
		switch (type) {
			case 'clear':
				setDisplayValue('')
				setResultState(false)

				break
			case 'equal': {
				const result = calcResultFromExpressionArray(displayValue)

				setDisplayValue(result)
				setResultState(true)
				break
			}
			case 'decimal': {
				setResultState(false)

				if (
					typeof displayValue !== 'number' &&
					(displayValue.endsWith('+') || displayValue.endsWith('-'))
				) {
					setDisplayValue(`${displayValue}0.`)
				} else {
					setDisplayValue(`${displayValue}.`)
				}
				break
			}
			case 'operator': {
				if (!displayValue && value !== '-') {
					return
				} else {
					setDisplayValue(displayValue + value)
				}
				setResultState(false)
				break
			}

			default:
				setResultState(false)
				setDisplayValue(
					resultState
						? String(parseFloat(value))
						: String(displayValue) + parseFloat(value)
				)
				break
		}
	}

	return (
		<div className={styles.container}>
			<span
				className={`${styles.display} ${
					resultState && styles.highlight
				}`}
			>
				{displayValue}
			</span>
			<div className={styles.buttonList}>
				{buttons.map(({ value, type }) => (
					<button
						className={`${styles.button} ${
							isButtonDisabled({ type })
								? styles.buttonDisabled
								: ''
						}`}
						disabled={isButtonDisabled({ type })}
						key={value}
						onClick={() => handleButtonClick({ value, type })}
					>
						{value}
					</button>
				))}
			</div>
		</div>
	)
}
