import { useState } from 'react'
import { useSelector } from 'react-redux'

import NumberSelect from '../numberSelect/numberSelect'
import { RootState } from '../../store/store'

type GridButtonProps = {
	key?: string
	defaultValue?: number
	row: number
	column: number
}

const GridButton = function GridButton(props: GridButtonProps) {
	const { key, defaultValue, row, column } = props

	const board = useSelector((state: RootState) => state.gameState.board)

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
				{board[row][column]}
		</button>
}

export default GridButton
