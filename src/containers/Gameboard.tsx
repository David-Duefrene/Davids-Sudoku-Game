import { useState } from 'react'

import GridButton from '../components/grid/gridButton'

const BOARDSIZE = 9

function App() {
	const [board, setBoard] = useState<number[][]>(Array(BOARDSIZE).fill(Array(BOARDSIZE).fill([])))

	const tiles = board.map((row, rowIndex) => {
		return row.map((colum, columIndex) => {
			const tileProps = {
				key: `${rowIndex}${columIndex}`,
				row: rowIndex,
				column: columIndex,
				defaultValue: colum,
			}

			return <GridButton {...tileProps} />
		})
	})

	return (
		<>
			<h1 className='leading-5 text-5xl text-center'>Sudoku</h1>
			<div className='grid grid-cols-9 gap-2'>{tiles}</div>
		</>
	)
}

export default App
