import { FaBolt } from 'react-icons/fa'

export const Home = () => {
	return (
		<div
			style={{
				textAlign: 'center',
				display: 'grid',
				placeContent: 'center',
				gridGap: '1rem'
			}}
		>
			<h1
				style={{
					textAlign: 'center'
				}}
			>
				Hi there
			</h1>
			<h1
				style={{
					fontWeight: 400,
					display: 'grid',
					alignItems: 'center',
					gridAutoFlow: 'column',
					gridGap: '1rem',
					lineHeight: 1,
					fontSize: '3rem',
					margin: 0,
					padding: '1rem'
				}}
			>
				{'{{'}
				<FaBolt size='3rem' />
				{'}}'}
			</h1>
		</div>
	)
}
