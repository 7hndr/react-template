import { useState } from 'react'

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

	const clearHandler = () => {
		setInputValue('')
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
				ref={_ref}
				className={styles.input}
				onChange={handleChange}
				{...otherProps}
			/>
			{inputValue && (
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
