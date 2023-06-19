import { useState, useContext } from 'react'

import { GameStateContext } from '../../hooks/useGameState'

type NumberSelectProps = {
	position: { row: number, column: number }
	close: () => void
}

const NumberSelect = function (props: NumberSelectProps) {
	const { close, position } = props

	const gameState = useContext(GameStateContext)

	const [pencilMode, setPencilMode] = useState<boolean>(true)
	const [pencilValue, setPencilValue] = useState<Set<number>>(new Set())
	const [rerender, setRerender] = useState<boolean>(false)

	const buttons = []
	for (let i = 1; i <= 9; i++) {
		const hasIndex = pencilValue.has(i)
		buttons.push(
			<button
				key={i}
				className={hasIndex ? 'invert' : 'bg-second-color '}
				onClick={() => {
					if (!pencilMode) {
						gameState.setTile(position.row, position.column, i)
						close()
						return
					}

					if (pencilValue.has(i)) {
						pencilValue.delete(i)
					} else {
						pencilValue.add(i)
					}
					setPencilValue(pencilValue)

					setRerender(!rerender)
				}} >
					{i}
			</button>
		)
	}

	return (
		<div className='grid grid-cols-3 bg-third-color'>
			<button
				className='bg-second-color col-span-2'
				onClick={() => setPencilMode(!pencilMode)} >
				{pencilMode ? 'Pencil' : 'Pen'}
			</button>
			<button className='bg-second-color' onClick={close}>X</button>
			{buttons}
		</div>
	)
}

export default NumberSelect
