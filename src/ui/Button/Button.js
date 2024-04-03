import styles from './Button.module.scss'

export const Button = ({
	children,
	loading,
	onClick,
	title,
	type,
	disabled,
	_ref
}) => {
	return (
		<button
			ref={_ref}
			type={type}
			disabled={disabled}
			onClick={onClick}
			title={title}
			className={`${styles.button} ${disabled ? styles.disabled : ''} ${
				loading ? styles.loading : ''
			}`}
		>
			{!loading && children}
		</button>
	)
}
