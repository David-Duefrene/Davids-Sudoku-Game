import { useSelector, useDispatch } from 'react-redux'

import GridButton from '../components/grid/gridButton'
import Winner from '../components/PopUps/Winner/Winner'

import { RootState } from '../store/store'
import { getRow, getColumn, getGrid } from '../util/matrixFunctions/2dMatrix/2dMatrix'

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
		<section className='container mx-auto'>
			<Winner isOpen={isSolved} />
			<div className='grid grid-cols-9 gap-1 sm:gap-2'>{tiles}</div>
		</section>
	)
}

export default App
