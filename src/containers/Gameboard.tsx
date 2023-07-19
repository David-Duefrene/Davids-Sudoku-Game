import { useSelector } from 'react-redux'

import GridButton from '../components/grid/gridButton'
import { RootState } from '../store/store'
import { absGetColumn, absGetGrid, absGetRow } from '../store/slices/gameBoardSlice'

const App = () => {
	const gameState = useSelector((state: RootState) => state.gameState.board)

	const tiles = gameState.map((row, rowIndex) => {
		return row.map((colum, columIndex) => {
			const unusableValues = new Set([
				...absGetRow(rowIndex, gameState),
				...absGetColumn(columIndex, gameState),
				...absGetGrid(rowIndex, columIndex, gameState),
			])

			return (
				<GridButton
					key={`${rowIndex}${columIndex}`}
					unusableValues={unusableValues}
					row={rowIndex}
					column={columIndex}
					hardValue={colum < 0}
					value={Math.abs(colum)} />
			)
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
