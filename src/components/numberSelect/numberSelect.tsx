import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../../store/store'
import { setTile as setTileDis } from '../../store/slices/gameBoardSlice'

type NumberSelectProps = {
	position: { row: number, column: number }
	close: () => void
}

const NumberSelect = function (props: NumberSelectProps) {
	const { close, position } = props
	const { row, column } = position

	const board = useSelector((state: RootState) => state.gameState.board)

	const dispatch = useDispatch()

	const setTile = (row: number, column: number, value: number) => {
		dispatch(setTileDis({ row, column, value }))
	}

	const getRow = (row: number) => board[row]
	const getColumn = (column: number) => board.map((row) => row[column])

	const [pencilMode, setPencilMode] = useState<boolean>(true)
	const [pencilValue, setPencilValue] = useState<Set<number>>(new Set())

	const [unusableValues, setUnusableValues] = useState<Set<number>>(new Set([...getRow(row), ...getColumn(column)]))

	useEffect(() => {
		setUnusableValues(
			new Set([...board[row], ...board.map((row) => row[column])])
		)
	}, [board, row, column])

	const buttons = []
	for (let i = 1; i <= 9; i++) {
		const hasIndex = pencilValue.has(i)

		buttons.push(
			<button
				key={i}
				className={hasIndex ? 'invert' : 'bg-second-color ' + 'disabled:opacity-50'}
				disabled={unusableValues.has(i) && board[row][column] !== i}
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
