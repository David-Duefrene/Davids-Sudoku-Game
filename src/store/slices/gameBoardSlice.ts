// Imports
import { createSlice } from '@reduxjs/toolkit'

// Types
export type IGameBoard = number[][]
export type IGameBoardState = { board: IGameBoard }

// Constants
let counter = 0
const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/* Local Helper Functions */
// Grid Functions
const getRow = (row: number, board: IGameBoard) => board[row]
const getColumn = (column: number, board: IGameBoard) => board.map((row) => row[column])
const getGrid = (row: number, column: number, board: IGameBoard) => {
	const grid: number[] = []
	const gridRow = Math.floor(row / 3) * 3
	const gridColumn = Math.floor(column / 3) * 3

	for (let i = gridRow; i < gridRow +3; i++) {
		for (let j = gridColumn; j < gridColumn +3; j++) {
			grid.push(board[i][j])
		}
	}

	return grid
}

// Shuffle an Array
const shuffle = (array: number[]) => {
	let currentIndex = array.length
	let temporaryValue, randomIndex

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
const safeToPlace = (board: number[][], emptyCell: { row: number; column: number }, num: number) => {
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
const fillPuzzle = (startingBoard = Array.from({ length: 9 }, () => Array(9).fill(null))) => {
	const emptyCell = nextEmptyCell(startingBoard)

	if (emptyCell === null) return startingBoard

	for (const num of shuffle(numArray) ) {
		counter++

		if ( counter > 20_000_000 ) throw new Error ("Recursion Timeout")

		if ( safeToPlace( startingBoard, emptyCell, num) ) {
		startingBoard[ emptyCell.row ][ emptyCell.column ] = num // If safe to place number, place it

		if ( fillPuzzle(startingBoard) ) return startingBoard

		startingBoard[ emptyCell.row ][ emptyCell.column ] = 0
		}
	}
	return false // If unable to place any number, return false, which triggers previous round to go to next num
  }

// Force Generate a Board
const forceGenerate = (): IGameBoard => {
	const board = fillPuzzle()
	if (board) return board
	return forceGenerate()
}

const initialState: IGameBoardState = {
	board: forceGenerate(),
}

export const gameBoardSlice = createSlice({
	name: 'gameState',
	initialState,
	reducers: {
		setTile: (state, action) => {
			const { row, column, value } = action.payload;

			const updatedBoard = state.board.map((rowArr) => [...rowArr])

			updatedBoard[row][column] = value

			return {
				...state,
				board: updatedBoard,
			}
		}
	}
})

export const { setTile } = gameBoardSlice.actions

export default gameBoardSlice.reducer
