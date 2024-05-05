import styles from './Footer.module.scss'

export const Footer = () => {
	return (
		<span className={styles.footer}>
			{`All rights reserved | ${new Date().getFullYear()}`}
		</span>
	)
}
