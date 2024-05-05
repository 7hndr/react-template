/* eslint-disable react/prop-types */
import { useState, useRef } from 'react'

import styles from './Input.module.scss'
import { FaRegTimesCircle } from 'react-icons/fa'

export const Input = ({
	_ref,
	label,
	className,
	error,
	onChange,
	...otherProps
}) => {
	const [inputValue, setInputValue] = useState('')
	const internalRef = useRef()

	const clearHandler = () => {
		setInputValue('')

		_ref?.current?.focus()
		internalRef?.current?.focus()

		onChange({ target: { name: otherProps.name || null, value: '' } })
	}

	const handleChange = event => {
		setInputValue(event.target.value)
		onChange(event)
	}

	return (
		<div className={`${styles.inputWrapper} ${className || ''}`}>
			<label
				htmlFor={otherProps.id}
				className={styles.label}
			>
				{label}
			</label>
			<input
				value={inputValue}
				ref={_ref || internalRef}
				className={styles.input}
				onChange={handleChange}
				{...otherProps}
			/>
			{(inputValue || otherProps.value) && (
				<button
					className={styles.inputCleaner}
					onClick={clearHandler}
				>
					<FaRegTimesCircle />
				</button>
			)}
			{error && <span className={styles.errorBlock}>{error}</span>}
		</div>
	)
}
