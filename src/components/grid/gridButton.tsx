import { useState, useContext } from 'react'

import NumberSelect from '../numberSelect/numberSelect'
import { GameStateContext } from '../../hooks/useGameState'

type GridButtonProps = {
	key?: string
	defaultValue?: number
	row: number
	column: number
}

const GridButton = function GridButton(props: GridButtonProps) {
	const { key, defaultValue, row, column } = props

	const gameState = useContext(GameStateContext)

	const [isClicked, setIsClicked] = useState<boolean>(false)

	const canChange = defaultValue === undefined

	return isClicked ?
		<NumberSelect
			close={() => setIsClicked(false)}
			position={{ row, column }}
		/> :
		<button
			disabled={canChange}
			onClick={() => setIsClicked(!isClicked)}
			className='bg-fourth-color w-24 h-24'
			key={key} >
				{gameState.board[row][column]}
		</button>
}

export default GridButton
