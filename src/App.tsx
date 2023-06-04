import { useState } from 'react'

const BOARDSIZE = 9

function App() {
	const [board, setBoard] = useState<number[][]>(Array(BOARDSIZE).fill(Array(BOARDSIZE).fill([])))

	const tiles = board.map((row, rowIndex) => {
		return row.map((tile, tileIndex) => {
			return <button className='bg-fourth-color w-20 h-20' key={`${rowIndex}${tileIndex}`}>{tile}</button>
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
