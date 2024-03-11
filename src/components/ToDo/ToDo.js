import { useState } from 'react'
import styles from './ToDo.module.scss'

const isValueVaild = v => {
	return v.length > 2
}

export const ToDo = () => {
	const [value, setValue] = useState('')
	const [list, setList] = useState([])
	const [error, setError] = useState('')

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение')
		setValue(promptValue)

		setError(
			isValueVaild(promptValue)
				? ''
				: 'Введенное значение должно содержать минимум 3 символа'
		)
	}

	const onAddButtonClick = () => {
		if (isValueVaild(value)) {
			const currentDate = new Date()
			const updatedList = [
				...list,
				{
					id: (+currentDate).toString(16),
					value,
					dt: new Intl.DateTimeFormat('ru', {
						dateStyle: 'short',
						timeStyle: 'short'
					}).format(currentDate)
				}
			]
			setList(updatedList)
			setError('')
			setValue('')
		}
	}

	const onClearButtonClick = () => {
		setList([])
	}

	const onClearValueButtonClick = () => {
		setError('')
		setValue('')
	}

	return (
		<div className={styles.todo}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<div className={styles['value-row']}>
				<p className={styles['no-margin-text']}>
					Текущее значение <code>value</code>:
					<output className={styles['current-value']}>
						{` ${value || '—'}`}
					</output>
				</p>
				{value && (
					<button
						className={`${styles.button} ${styles.mini}`}
						onClick={onClearValueButtonClick}
						title='Очистить'
					>
						x
					</button>
				)}
			</div>

			{error && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button
					className={styles.button}
					onClick={onInputButtonClick}
				>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild(value)}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
				<button
					className={styles.button}
					disabled={!list.length}
					onClick={onClearButtonClick}
				>
					Очистить список
				</button>
			</div>
			<h2 className={styles['list-heading']}>Список:</h2>
			<div className={styles['list-container']}>
				{list.length ? (
					<ul className={styles.list}>
						{list.map(({ id, value, dt }) => (
							<li
								className={styles['list-item']}
								key={id}
							>
								<p>{value} </p>
								<span>{dt}</span>
							</li>
						))}
					</ul>
				) : (
					<p className={styles['no-margin-text']}>
						Нет добавленных элементов
					</p>
				)}
			</div>
		</div>
	)
}
