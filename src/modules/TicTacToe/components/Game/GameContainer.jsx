import { useEffect } from 'react'
import { GameLayout } from './GameLayout'
import { useSelector, useDispatch } from 'react-redux'
import { selectFieldByParam } from '../../config/selectors.js'
import {
	changeDrawState,
	setGameOverState,
	setLoading,
	setAiOpponent,
	setGameField,
	setDirtyState,
	setActiveWinPattern,
	setCurrentPlayer,
	makeAiStep
} from '../../config/actions.js'

//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

export const GameContainer = () => {
	const dispatch = useDispatch()

	const currentPlayer = useSelector(selectFieldByParam('currentPlayer'))

	const restartGame = () => {
		dispatch(changeDrawState(false))
		dispatch(setGameOverState(false))
		dispatch(setLoading(false))
		dispatch(setAiOpponent(true))
		dispatch(setGameField())
		dispatch(setDirtyState(false))
		dispatch(setActiveWinPattern(null))
		dispatch(setCurrentPlayer())
	}

	useEffect(() => {
		dispatch(makeAiStep())
	}, [currentPlayer, dispatch])

	return <GameLayout restartGame={restartGame} />
}
