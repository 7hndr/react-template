import styles from './Button.module.scss'

export const Button = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={styles.button}
		>
			{children}
		</button>
	)
}
