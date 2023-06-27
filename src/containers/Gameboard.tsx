import { useSelector } from 'react-redux';

import GridButton from '../components/grid/gridButton'
import { RootState } from '../store/store';

function App() {
	const gameState = useSelector((state: RootState) => state.gameState.board)

	const tiles = gameState.map((row, rowIndex) => {
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
