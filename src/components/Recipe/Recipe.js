import { useState } from 'react'
import styles from './Recipe.module.scss'

export const Recipe = ({ pelmeni }) => {
	const [recipe, setRecipe] = useState({})
	const [activeIndex, setActiveIndex] = useState(0)

	const uploadRecipe = () => {
		setRecipe(pelmeni)
	}

	const stepIsLast = recipe && activeIndex === recipe.steps?.length - 1
	const stepIsFirst = recipe && activeIndex === 0

	const buttonClickHandler = i => {
		if (i < 0 || activeIndex === i) return
		setActiveIndex(i > recipe.steps.length - 1 ? 0 : i)
	}

	const noRecipe = (
		<div className={styles.noRecipe}>
			<p>Рецепта нет 😒</p>
			<p>
				Номер пиццерии: <br /> <b>+0 (555) 555-55-55</b>
			</p>
			<p>Ну или...</p>
			<button
				onClick={uploadRecipe}
				className={styles.button}
			>
				Посмотреть как делать пельмени
			</button>
		</div>
	)

	if (!recipe?.steps?.length) return noRecipe

	return (
		<div className={styles.container}>
			<h1 className={styles.recipeTitle}>{recipe.name}</h1>

			<div className={styles.recipeContent}>
				<h2>{recipe.steps[activeIndex]?.title || '—'}</h2>

				<div className={styles.recipeText}>
					{recipe.steps[activeIndex]?.content || '—'}
				</div>
			</div>

			<ul className={styles.stepButtonList}>
				{recipe.steps.map((recipeStep, i) => {
					return (
						<li
							key={recipeStep.id}
							className={styles.stepButtonListItem}
						>
							<button
								className={`${styles.button} ${styles.radial} ${
									activeIndex === i && styles.buttonActive
								}`}
								onClick={() => buttonClickHandler(i)}
							>
								{i + 1}
							</button>
							<h3 className={styles.stepTitle}>
								{recipeStep.title}
							</h3>
						</li>
					)
				})}
			</ul>

			<div className={styles.controlButtons}>
				<button
					className={`${styles.button} ${
						stepIsFirst && styles.buttonDisabled
					}`}
					onClick={() => buttonClickHandler(activeIndex - 1)}
				>
					Назад
				</button>
				<button
					className={styles.button}
					onClick={() => buttonClickHandler(activeIndex + 1)}
				>
					{stepIsLast ? 'В начало' : 'Далее'}
				</button>
			</div>
		</div>
	)
}
