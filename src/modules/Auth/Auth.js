import { FaUserAstronaut, FaRedo } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import styles from './Auth.module.scss'

import { Input, Button } from '../../ui'
import { SentSuccess } from './components/SentSuccess'

import { schema, rules } from './validation'
import { formModel, initialState } from './config'
import { useValidate, useForm } from '../../hooks'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

export const Auth = () => {
	const [tryCount, setTryCount] = useState(0)
	const [isFormLoading, setFormLoading] = useState(false)
	const [isSent, setIsSent] = useState(false)

	const submitRef = useRef()

	const { form, onChange, clearForm } = useForm({ initialState })
	const { getErrors, isFormValid } = useValidate({ form, schema, rules })

	const errors = !!tryCount ? getErrors() : {}

	const handleTryAgain = () => {
		setTryCount(0)
		clearForm()
		setIsSent(false)
	}

	const handleSubmit = e => {
		e.preventDefault()
		setTryCount(pv => pv + 1)

		console.log({ form })

		if (isFormValid()) {
			setFormLoading(true)

			setTryCount(0)

			setTimeout(() => {
				setFormLoading(false)
				setIsSent(true)
			}, 1024)
		}
	}

	useEffect(() => {
		!isSent && isFormValid() && submitRef.current.focus()
	}, [isFormValid, isSent])

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	return (
		<div className={styles.authWrapper}>
			{isSent ? (
				<SentSuccess handleTryAgain={handleTryAgain} />
			) : (
				<>
					<FaUserAstronaut
						size='3rem'
						className={styles.icon}
					/>

					<form
						onSubmit={e => handleSubmit(e, form)}
						className={styles.form}
					>
						{formModel.map(input => (
							<Input
								{...input}
								key={input.id}
								value={form[input.id]}
								error={errors[input.id]?.[0]}
								onChange={onChange}
							/>
						))}

						<div className={styles.buttonsBlock}>
							<Button
								disabled={tryCount !== 0 && !isFormValid()}
								_ref={submitRef}
								type='submit'
								loading={isFormLoading}
							>
								Enter
							</Button>
							<Button
								onClick={handleTryAgain}
								type='button'
								title='Reset'
							>
								<FaRedo />
							</Button>
						</div>
					</form>
				</>
			)}
		</div>
	)
}
