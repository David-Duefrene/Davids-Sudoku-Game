import { useSelector, useDispatch } from 'react-redux'

import GridButton from '../components/grid/gridButton'

import { RootState } from '../store/store'
import { getColumn, getGrid, getRow } from '../store/slices/gameBoardSlice'

const App = () => {
	const gameState = useSelector((state: RootState) => state.gameState.board)
	const dispatch = useDispatch()

	const tiles = gameState.map((row, rowIndex) => {
		return row.map((colum, columIndex) => {
			const unusableValues = new Set([
				...getRow(rowIndex, gameState),
				...getColumn(columIndex, gameState),
				...getGrid(rowIndex, columIndex, gameState),
			])

			return (
				<GridButton
					key={`${rowIndex}${columIndex}`}
					unusableValues={unusableValues}
					hardValue={colum.immutable}
					setTile={(value: number) => dispatch({ type: 'gameState/setTile', payload: { row: rowIndex, column: columIndex, value } })}
					value={colum.value} />
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
