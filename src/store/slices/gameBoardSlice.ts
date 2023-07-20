// Imports
import { createSlice } from '@reduxjs/toolkit'

// Types
export type IGameBoardState = { board: number[][] }
export type ICoordinates = { row: number; column: number }

// Constants
const numArray = [ -1, -2, -3, -4, -5, -6, -7, -8, -9 ]

/* Local Helper Functions */
// Grid Functions
type ITile = { value: number | null, immutable: boolean }

// Check if tile is a tile
const isTile = (tile: number | ITile): tile is ITile => {
	return tile !== null && typeof tile === 'object' && 'value' in tile
}

// Returns a single row from the board
export const getRow = (row: number, board: ITile[][] | number[][]) => {
	const result = []
	for (const tile of board[row]) {
		if (isTile(tile)) {
			if (tile.value !== null) result.push(tile.value)
		} else result.push(tile)
	}
	return result
}

// Returns a single column from the board
export const getColumn = (column: number, board: ITile[][] | number[][]) => {
	const result = []
	for (const row of board) {
		const tile = row[column]
		if (isTile(tile)) {
			if (tile.value !== null) result.push(tile.value)
		} else result.push(tile)
	}
	return result
}

// Returns a 3x3 grid from the board
export const getGrid = (row: number, column: number, board: ITile[][] | number[][]) => {
	const grid = []
	const gridRow = Math.floor(row / 3) * 3
	const gridColumn = Math.floor(column / 3) * 3

	for (let i = gridRow; i < gridRow +3; i++) {
		for (let j = gridColumn; j < gridColumn +3; j++) {
			const tile = board[i][j]
			if (isTile(tile)) {
				if (tile.value !== null) grid.push(tile.value)
			} else grid.push(tile)
		}
	}

	return grid
}

// Range Function - Generate a range of numbers from 0 to length
const range = (length: number) => Array.from(Array(length).keys())

// Get a list of all empty cells in the board from top-left to bottom-right
const emptyCellCoords = (startingBoard: number[][]) => {
	const listOfEmptyCells: ICoordinates[] = []

	for (const row of range(8)) {
		for (const column of range(8)) {
			if (startingBoard[row][column] === 0) listOfEmptyCells.push({ row, column })
		}
	}

	return listOfEmptyCells
}

// Shuffle an Array
const shuffle = (array: number[]) => {
	let currentIndex = array.length
	let temporaryValue: number, randomIndex: number

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}

	return array
}

// Check if number is safe to place
const safeToPlace = (board: number[][], emptyCell: ICoordinates, num: number) => {
	const row = getRow(emptyCell.row, board)
	const column = getColumn(emptyCell.column, board)
	const grid = getGrid(emptyCell.row, emptyCell.column, board)

	return !row.includes(num) && !column.includes(num) && !grid.includes(num)
}

// Find next empty cell
const nextEmptyCell = (board: number[][]) => {
	for (let row = 0; row < 9; row++) {
		for (let column = 0; column < 9; column++) {
			if (board[row][column] === null) {
				return { row, column }
			}
		}
	}
	return null
}

// Fill the puzzle
let counter = 0
const fillPuzzle = (startingBoard = Array.from({ length: 9 }, () => Array(9).fill(null))) => {
	const emptyCell = nextEmptyCell(startingBoard)

	if (emptyCell === null) return startingBoard

	for (const num of shuffle(numArray)) {
		counter++

		if (counter > 25000) throw new Error('Recursion Timeout')

		if (safeToPlace(startingBoard, emptyCell, num)) {
			startingBoard[emptyCell.row][emptyCell.column] = num

			if (fillPuzzle(startingBoard)) return startingBoard
		}
	}
	return false
}

// Find next empty cell
const nextStillEmptyCell = (startingBoard: number[][], emptyCellArray: ICoordinates[]) => {
	for (const coord of emptyCellArray) {
		const { row, column } = coord

		if (startingBoard[row][column] === 0) return { row, column }
	}
	return false
}

// Attempts to solve the puzzle by placing values into the board via the emptyCellArray
const fillFromArray = (startingBoard: number[][], emptyCellArray: ICoordinates[]) => {
	const emptyCell = nextStillEmptyCell(startingBoard, emptyCellArray)
	let pokeCounter = 0

	if (!emptyCell) return startingBoard

	for (const num of shuffle(numArray)) {
		pokeCounter++
		if (pokeCounter > 60_000_000) throw new Error('Poke Timeout')
		if (safeToPlace(startingBoard, emptyCell, num)) {
			startingBoard[emptyCell.row][emptyCell.column] = num
			if (fillFromArray(startingBoard, emptyCellArray)) return startingBoard
			startingBoard[emptyCell.row][emptyCell.column] = 0
		}
	}

	return false
}

// Check if there are multiple possible solutions
const multiplePossibleSolutions = (boardToCheck: number[][]) => {
	const possibleSolutions = []
	const emptyCellArray = emptyCellCoords(boardToCheck)
	for (let index = 0; index < emptyCellArray.length; index++) {
		// Rotate a clone of the emptyCellArray by one for each iteration
		const emptyCellClone = [ ...emptyCellArray ]
		const startingPoint = emptyCellClone.splice(index, 1)

		emptyCellClone.unshift(startingPoint[0])
		const thisSolution = fillFromArray(boardToCheck.map((row) => row.slice()), emptyCellClone)

		if (!thisSolution) return false
		possibleSolutions.push(thisSolution.join())
		if (Array.from(new Set(possibleSolutions)).length > 1) return true
	}
	return false
}

// Makes empty tiles on the board
const pokeHoles = (startingBoard: number[][], holes: number) => {
	const removedValues = []

	while (removedValues.length < holes) {
		const val = Math.floor(Math.random() * 81)
		const randomRowIndex = Math.floor(val / 9)
		const randomColIndex = val % 9

		if (!startingBoard[randomRowIndex]) continue // Guard against cloning error
		if (startingBoard[randomRowIndex][randomColIndex] === 0) continue // If cell already empty, restart loop

		removedValues.push({
			rowIndex: randomRowIndex,
			colIndex: randomColIndex,
			val: startingBoard[randomRowIndex][randomColIndex],
		})
		startingBoard[randomRowIndex][randomColIndex] = 0 // Poke a hole in the board at the coords

		if (multiplePossibleSolutions(startingBoard.map((row) => row.slice()))) {
			const temp = removedValues.pop()?.val
			if (temp === undefined) throw new Error('Temp is undefined')
			startingBoard[randomRowIndex][randomColIndex] = temp
		}
	}

	return startingBoard.map((row) => row.map((num) => {
		return {
			value: num === 0 ? null : Math.abs(num),
			immutable: num < 0,
		}
	}))
}

// Force Generate a Board
const forceGenerate = (): ITile[][] => {
	const board = fillPuzzle()
	if (board) return pokeHoles(board, 40)
	return forceGenerate()
}

const initialState: { board: ITile[][]} = {
	board: forceGenerate(),
}

export const gameBoardSlice = createSlice({
	name: 'gameState',
	initialState,
	reducers: {
		setTile: (state, action) => {
			const { row, column, value } = action.payload

			const updatedBoard = state.board.map((rowArr) => [ ...rowArr ])

			updatedBoard[row][column] = { value, immutable: false }

			return {
				...state,
				board: updatedBoard,
			}
		},
	},
})

export const { setTile } = gameBoardSlice.actions

export default gameBoardSlice.reducer
