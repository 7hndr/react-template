import { FaRegUser, FaRedo } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import styles from './LibsAuth.module.scss'

import { Button } from '../../ui'
import { SentSuccess } from './components/SentSuccess'

import { libsSchema } from './validation'
import { formModel } from './config'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

export const LibsAuth = () => {
	const [isSent, setIsSent] = useState(false)
	const [isFormLoading, setFormLoading] = useState(false)
	const submitRef = useRef()
	const prevSubmitDisabledState = useRef(false)

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(libsSchema)
	})

	const isSubmitDisabled = !!Object.values(errors)
		.map(e => e?.message)
		.filter(Boolean)?.length

	const onSubmit = form => {
		console.log({ form })

		setFormLoading(true)

		setTimeout(() => {
			setFormLoading(false)
			setIsSent(true)
		}, 1024)
	}

	const handleTryAgain = () => {
		reset()
		setIsSent(false)
	}

	const handleReset = () => {
		reset()
	}

	useEffect(() => {
		!isSent &&
			!!prevSubmitDisabledState.current &&
			!isSubmitDisabled &&
			submitRef.current.focus()

		prevSubmitDisabledState.current = isSubmitDisabled
	}, [isSubmitDisabled, isSent])

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	return (
		<div className={styles.authWrapper}>
			{isSent ? (
				<SentSuccess handleTryAgain={handleTryAgain} />
			) : (
				<>
					<FaRegUser
						size='3rem'
						className={styles.icon}
					/>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className={styles.form}
					>
						{formModel.map(input => (
							<div
								className={styles.inputWrapper}
								key={input.id}
							>
								<label
									htmlFor={input.id}
									className={styles.label}
								>
									{input.label}
								</label>
								<input
									type={input.type}
									{...register(input.id)}
									className={styles.input}
								/>
								{errors[input.id]?.message && (
									<span className={styles.errorBlock}>
										{errors[input.id]?.message}
									</span>
								)}
							</div>
						))}
						<div className={styles.buttonsBlock}>
							<Button
								_ref={submitRef}
								disabled={isSubmitDisabled}
								type='submit'
								loading={isFormLoading}
							>
								Enter
							</Button>
							<Button
								onClick={handleReset}
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
