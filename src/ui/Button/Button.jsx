/* eslint-disable react/prop-types */
import styles from './Button.module.scss'

export const Button = ({
	className,
	children,
	loading,
	disabled,
	onClick,
	simple,
	square,
	active,
	title,
	type,
	_ref
}) => {
	return (
		<button
			ref={_ref}
			type={type}
			disabled={disabled}
			onClick={onClick}
			title={title}
			className={`
				${styles.button}
				${disabled ? styles.disabled : ''}
				${loading ? styles.loading : ''}
				${simple ? styles.simple : ''}
				${square ? styles.square : ''}
				${active ? styles.active : ''}
				${className ? className : ''}
			`}
		>
			{!loading && children}
		</button>
	)
}
