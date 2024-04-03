import styles from './Input.module.scss'

export const Input = ({ label, error, ...otherProps }) => {
	return (
		<div className={styles.inputWrapper}>
			<label
				htmlFor={otherProps.id}
				className={styles.label}
			>
				{label}
			</label>
			<input
				className={styles.input}
				{...otherProps}
			/>
			{error && <span className={styles.errorBlock}>{error}</span>}
		</div>
	)
}
