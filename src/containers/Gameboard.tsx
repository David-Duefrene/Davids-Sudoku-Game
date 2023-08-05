import { useSelector, useDispatch } from 'react-redux'

import GridButton from '../components/grid/gridButton'
import Winner from '../components/PopUps/Winner/Winner'

import { RootState } from '../store/store'
import { getGrid } from '../store/slices/gameBoardSlice'
import { getRow, getColumn } from '../util/matrixFunctions/2dMatrix/2dMatrix'

const App = () => {
	const gameState = useSelector((state: RootState) => state.gameState.board)
	const isSolved = useSelector((state: RootState) => state.gameState.isSolved)
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
					setTile={(value: number) =>
						dispatch({
							type: 'gameState/setTile',
							payload: { row: rowIndex, column: columIndex, value },
						})
					}
					value={colum.value}
				/>
			)
		})
	})

	return (
		<>
			<Winner isOpen={isSolved} />
			<h1 className='leading-5 text-5xl text-center'>Sudoku</h1>
			<div className='grid grid-cols-9 gap-2'>{tiles}</div>
		</>
	)
}

export default App
