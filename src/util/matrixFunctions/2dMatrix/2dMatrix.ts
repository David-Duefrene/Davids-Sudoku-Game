import { range } from '../../arrayFunctions/array'

const VALID_VALUES = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

export type ITile = {
	value: number | null
	immutable: boolean
}
export type ICoordinates = { row: number; column: number }

// Returns a single row from the board
export const getRow = (row: number, board: ITile[][]): number[] => {
	if (row < 0 || row > board.length - 1) return []

	const result: number[] = []
	for (const tile of board[row]) {
		if (tile.value !== null) result.push(tile.value)
	}
	return result
}

// Returns a single column from the board
export const getColumn = (column: number, board: ITile[][]): number[] => {
	const result: number[] = []
	for (const row of board) {
		const tile = row[column]
		if (tile.value !== null) result.push(tile.value)
	}
	return result
}

// Returns a 3x3 grid from the board
type FGetGrid = (row: number, column: number, board: ITile[][]) => number[]
export const getGrid: FGetGrid = (row, column, board) => {
	const grid: number[] = []
	const gridRow = Math.floor(row / 3) * 3
	const gridColumn = Math.floor(column / 3) * 3

	for (let i = gridRow; i < gridRow + 3; i++) {
		for (let j = gridColumn; j < gridColumn + 3; j++) {
			const tile = board[i][j]
			if (tile.value !== null) grid.push(tile.value)
		}
	}

	return grid
}

// Get a list of all empty cells in the board from top-left to bottom-right
export const emptyCellCoords = (startingBoard: ITile[][]): ICoordinates[] => {
	const listOfEmptyCells: ICoordinates[] = []

	for (const row of range(9)) {
		for (const column of range(9)) {
			if (startingBoard[row][column] === null) {
				listOfEmptyCells.push({ row, column })
			}
		}
	}

	return listOfEmptyCells
}

// Check if number is safe to place
type FSafeToPlace = (
	board: ITile[][],
	emptyCell: ICoordinates,
	num: number
) => boolean
export const safeToPlace: FSafeToPlace = (board, emptyCell, num) => {
	if (!VALID_VALUES.includes(num)) return false
	const row = getRow(emptyCell.row, board)
	const column = getColumn(emptyCell.column, board)
	const grid = getGrid(emptyCell.row, emptyCell.column, board)

	return !row.includes(num) && !column.includes(num) && !grid.includes(num)
}

// Find next empty cell
export const nextEmptyCell = (board: ITile[][]): ICoordinates | null => {
	for (let row = 0; row < 9; row++) {
		for (let column = 0; column < 9; column++) {
			if (board[row][column].value === null) {
				return { row, column }
			}
		}
	}
	return null
}

