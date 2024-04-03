import { useState } from 'react'
import { LibsAuth, Auth } from '../../modules'
import { Switch } from '../../ui'
import styles from './Auth.module.scss'

export const AuthPage = () => {
	const [withoutLibs, setWithLibs] = useState(true)

	return (
		<div className={styles.authBlock}>
			<Switch
				label='Without Yup & react-hook-form'
				checked={withoutLibs}
				onChange={setWithLibs}
			/>
			{withoutLibs ? <Auth /> : <LibsAuth />}
		</div>
	)
}
