import { range } from '../../arrayFunctions/array'

import { shuffle } from '../../arrayFunctions/array'

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

// Fill the puzzle
let counter = 0
const starterArray = Array.from({ length: 9 }, () =>
	Array(9)
		.fill(null)
		.map(() => ({ value: null, immutable: true })),
)
type FFillPuzzle = (startingBoard?: ITile[][]) => ITile[][] | false
export const fillPuzzle: FFillPuzzle = (startingBoard = starterArray) => {
	const emptyCell = nextEmptyCell(startingBoard)

	if (emptyCell === null) return startingBoard

	for (const num of shuffle(VALID_VALUES)) {
		counter++

		if (counter > 25000) throw new Error('Recursion Timeout')

		if (safeToPlace(startingBoard, emptyCell, num)) {
			startingBoard[emptyCell.row][emptyCell.column].value = num
			if (fillPuzzle(startingBoard)) return startingBoard

			startingBoard[emptyCell.row][emptyCell.column].value = null
		}
	}
	return false
}

// Find next empty cell
type FNextStillEmptyCell = (startingBoard: ITile[][], emptyCellArray: ICoordinates[]) => ICoordinates | false
export const nextStillEmptyCell: FNextStillEmptyCell = (startingBoard, emptyCellArray) => {
	for (const coord of emptyCellArray) {
		const { row, column } = coord

		if (startingBoard[row][column].value === null) return { row, column }
	}
	return false
}

// Attempts to solve the puzzle by placing values into the board via the emptyCellArray
export const fillFromArray = (startingBoard: ITile[][], emptyCellArray: ICoordinates[]): ITile[][] | false => {
	const emptyCell = nextStillEmptyCell(startingBoard, emptyCellArray)
	let pokeCounter = 0

	if (!emptyCell) return startingBoard

	for (const num of shuffle(VALID_VALUES)) {
		pokeCounter++
		if (pokeCounter > 60_000_000) throw new Error('Poke Timeout')
		if (safeToPlace(startingBoard, emptyCell, num)) {
			startingBoard[emptyCell.row][emptyCell.column].value = num
			if (fillFromArray(startingBoard, emptyCellArray)) return startingBoard
			startingBoard[emptyCell.row][emptyCell.column].value = null
		}
	}

	return false
}

export const isValidSudoku = (board: ITile[][]): boolean => {
	const rows = Array.from({ length: 9 }, () => new Set<number>())
	const columns = Array.from({ length: 9 }, () => new Set<number>())
	const grids = Array.from({ length: 9 }, () => new Set<number>())

	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			const cellValue = board[row][col].value

			if (cellValue === null) {
				continue
			}

			const gridIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3)

			if (rows[row].has(cellValue) || columns[col].has(cellValue) || grids[gridIndex].has(cellValue)) {
				return false
			}

			rows[row].add(cellValue)
			columns[col].add(cellValue)
			grids[gridIndex].add(cellValue)
		}
	}

	return true
}

export const multiplePossibleSolutions = (boardToCheck: ITile[][]): boolean => {
	const emptyCellArray = emptyCellCoords(boardToCheck)

	const fillAndCountSolutions = (emptyCells: ICoordinates[], attempts: number): number => {
		if (attempts <= 0) return 0

		const cloneBoard = boardToCheck.map((row) => row.map((cell) => ({ ...cell })))
		const selectedEmptyCell = emptyCells.pop()

		if (!selectedEmptyCell) {
			return isValidSudoku(cloneBoard) ? 1 : 0
		}

		let totalSolutions = 0

		for (const num of shuffle(VALID_VALUES)) {
			if (safeToPlace(cloneBoard, selectedEmptyCell, num)) {
				cloneBoard[selectedEmptyCell.row][selectedEmptyCell.column].value = num
				totalSolutions += fillAndCountSolutions([ ...emptyCells ], attempts - 1)
				cloneBoard[selectedEmptyCell.row][selectedEmptyCell.column].value = null

				if (totalSolutions > 1) {
					return totalSolutions
				}
			}
		}

		return totalSolutions
	}

	return fillAndCountSolutions(emptyCellArray, 2) > 1
}

// Makes empty tiles on the board
export const pokeHoles = (startingBoard: ITile[][], holes: number): ITile[][] => {
	const removedValues: {
		rowIndex: number
		colIndex: number
		val: number | null
	}[] = []

	while (removedValues.length < holes) {
		const val = Math.floor(Math.random() * 81)
		const randomRowIndex = Math.floor(val / 9)
		const randomColIndex = val % 9

		if (!startingBoard[randomRowIndex]) continue // Guard against cloning error
		// If cell already empty, restart loop
		if (startingBoard[randomRowIndex][randomColIndex].value === null) continue

		removedValues.push({
			rowIndex: randomRowIndex,
			colIndex: randomColIndex,
			val: startingBoard[randomRowIndex][randomColIndex].value,
		})

		startingBoard[randomRowIndex][randomColIndex].value = null // Poke a hole in the board at the coords
		startingBoard[randomRowIndex][randomColIndex].immutable = false

		if (multiplePossibleSolutions(startingBoard.map((row) => row.slice()))) {
			const temp = removedValues.pop()?.val
			if (temp === undefined) throw new Error('Temp is undefined')
			startingBoard[randomRowIndex][randomColIndex].value = temp
			startingBoard[randomRowIndex][randomColIndex].immutable = true
		}
	}
	return startingBoard
}

