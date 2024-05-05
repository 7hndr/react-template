/* eslint-disable react/prop-types */
import { FaArrowLeft, FaBan } from 'react-icons/fa'
import { Button } from '../../../../ui'

export const NotExistedTodoItem = ({ goToList }) => {
	return (
		<div
			style={{
				display: 'grid',
				gridGap: '2rem',
				justifyItems: 'center'
			}}
		>
			<FaBan size='3rem' />
			<p>There is no Todo item with this id</p>
			<Button
				simple
				onClick={() => goToList()}
			>
				<FaArrowLeft />
				Go back
			</Button>
		</div>
	)
}
