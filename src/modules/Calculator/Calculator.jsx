import { useState, useEffect } from 'react'
import styles from './Calculator.module.scss'
import { buttons } from './button-config'
import { getArrWithModifedLastEl, calcResult } from './helpers'

const OPERATORS = ['-', '+']

export const Calculator = () => {
	const [displayValue, setDisplayValue] = useState('')
	const [resultState, setResultState] = useState(false)
	const [expArr, setExpArr] = useState([])

	const isButtonDisabled = ({ type }) => {
		switch (type) {
			case 'operator':
				return (
					typeof displayValue !== 'number' &&
					expArr.length &&
					OPERATORS.includes(expArr.at(-1))
				)

			default:
				return false
		}
	}

	const handleButtonClick = ({ value, type }) => {
		switch (type) {
			case 'clear':
				setResultState(false)
				setExpArr([])
				break
			case 'equal': {
				const result = calcResult(expArr)

				setResultState(true)
				setExpArr([result])
				break
			}
			case 'decimal': {
				setResultState(false)

				if (expArr.length && OPERATORS.includes(expArr.at(-1))) {
					setExpArr([...expArr, '0.'])
				} else if (!expArr.length) {
					setExpArr([`0.`])
				} else if (Number.isInteger(expArr.at(-1))) {
					setExpArr(
						getArrWithModifedLastEl(expArr, `${expArr.at(-1)}.`)
					)
				}
				break
			}
			case 'operator': {
				if (!expArr.length && value !== '-') {
					setExpArr([value])
				} else {
					setExpArr([...expArr, value])
				}
				setResultState(false)
				break
			}
			case 'number': {
				setResultState(false)

				if (resultState) {
					setExpArr([parseFloat(value)])
				} else if (OPERATORS.includes(expArr?.at(-1))) {
					if (expArr.length > 1) {
						setExpArr([...expArr, parseFloat(value)])
					} else if (expArr[0] === '-') {
						setExpArr([parseFloat(value) * -1])
					}
				} else if (
					(expArr.length && typeof expArr.at(-1) === 'string') ||
					Number.isInteger(expArr.at(-1))
				) {
					setExpArr(
						getArrWithModifedLastEl(
							expArr,
							parseFloat(String(expArr.at(-1)) + value)
						)
					)
				} else {
					setExpArr([...expArr, parseFloat(value)])
				}

				break
			}
			default:
				console.warn('Incorrect type')
		}
	}

	useEffect(() => setDisplayValue(expArr.join(' ')), [expArr])

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
