import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setTile as setTileDis } from '../../store/slices/gameBoardSlice'

type NumberSelectProps = {
	position: { row: number, column: number }
	value: number
	unusableValues: Set<number>
	close: () => void
}

const NumberSelect = function (props: NumberSelectProps) {
	const { value, unusableValues, close, position } = props
	const { row, column } = position

	const dispatch = useDispatch()

	const setTile = (row: number, column: number, value: number) => {
		dispatch(setTileDis({ row, column, value }))
	}

	const [ pencilMode, setPencilMode ] = useState<boolean>(true)
	const [ pencilValue, setPencilValue ] = useState<Set<number>>(new Set())

	const buttons = []
	for (let i = 1; i <= 9; i++) {
		const hasIndex = pencilValue.has(i)

		buttons.push(
			<button
				key={i}
				className={hasIndex ? 'invert' : 'bg-second-color ' + 'disabled:opacity-50'}
				disabled={unusableValues.has(i) && value !== i}
				onClick={() => {
					if (!pencilMode) {
						setTile(row, column, i)
						close()
						return
					}

					if (pencilValue.has(i)) {
						pencilValue.delete(i)
					} else {
						pencilValue.add(i)
					}
					setPencilValue(new Set(pencilValue))
				}} >
				{i}
			</button>,
		)
	}

	return (
		<div className='grid grid-cols-3 bg-third-color w-24 h-24'>
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
