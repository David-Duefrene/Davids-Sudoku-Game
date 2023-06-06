import { useState } from 'react'

import GridButton from '../components/grid/gridButton'

const BOARDSIZE = 9

function App() {
	const [board, setBoard] = useState<number[][]>(Array(BOARDSIZE).fill(Array(BOARDSIZE).fill([])))

	const tiles = board.map((row, rowIndex) => {
		return row.map((tile, tileIndex) => {
			return <GridButton key={`${rowIndex}${tileIndex}`}>{tile}</GridButton>
		})
	})
	return (
		<>
			<h1 className='leading-5 text-5xl text-center'>Sudoku</h1>
			<div className='grid grid-cols-9 gap-4'>{tiles}</div>
		</>
	)
}

export default App
