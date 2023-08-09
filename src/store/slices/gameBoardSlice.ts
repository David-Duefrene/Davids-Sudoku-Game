// Imports
import { createSlice } from '@reduxjs/toolkit'

import {
	emptyCellCoords, safeToPlace, fillPuzzle, nextStillEmptyCell,
} from '../../util/matrixFunctions/2dMatrix/2dMatrix'
import type { ITile, ICoordinates } from '../../util/matrixFunctions/2dMatrix/2dMatrix'
import { shuffle } from '../../util/arrayFunctions/array'

// Types
export type IGameBoardState = { board: ITile[][] }

// Constants
const numArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

/* Local Helper Functions */
// Grid Functions

// Attempts to solve the puzzle by placing values into the board via the emptyCellArray
const fillFromArray = (
	startingBoard: ITile[][],
	emptyCellArray: ICoordinates[],
): ITile[][] | false => {
	const emptyCell = nextStillEmptyCell(startingBoard, emptyCellArray)
	let pokeCounter = 0

	if (!emptyCell) return startingBoard

	for (const num of shuffle(numArray)) {
		pokeCounter++
		if (pokeCounter > 60_000_000) throw new Error('Poke Timeout')
		if (safeToPlace(startingBoard, emptyCell, num)) {
			startingBoard[emptyCell.row][emptyCell.column].value = num
			if (fillFromArray(startingBoard, emptyCellArray)) return startingBoard
			startingBoard[emptyCell.row][emptyCell.column].value = null //0
		}
	}

	return false
}

// Check if there are multiple possible solutions
const multiplePossibleSolutions = (boardToCheck: ITile[][]): boolean => {
	const possibleSolutions = []
	const emptyCellArray = emptyCellCoords(boardToCheck)
	for (let index = 0; index < emptyCellArray.length; index++) {
		// Rotate a clone of the emptyCellArray by one for each iteration
		const emptyCellClone = [ ...emptyCellArray ]
		const startingPoint = emptyCellClone.splice(index, 1)

		emptyCellClone.unshift(startingPoint[0])
		const thisSolution = fillFromArray(
			boardToCheck.map((row) => row.slice()),
			emptyCellClone,
		)

		if (!thisSolution) return false
		possibleSolutions.push(thisSolution.join())
		if (Array.from(new Set(possibleSolutions)).length > 1) return true
	}
	return false
}

// Makes empty tiles on the board
const pokeHoles = (startingBoard: ITile[][], holes: number): ITile[][] => {
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

// Force Generate a Board
const forceGenerate = (): ITile[][] => {
	const board = fillPuzzle()
	if (!board) throw new Error('Board is undefined')

	if (board) return pokeHoles(board, 40)
	return forceGenerate()
}

const initialState: { board: ITile[][]; isSolved: boolean } = {
	board: forceGenerate(),
	isSolved: false,
}

// Checks if the board is solved
const checkIfSolved = (board: ITile[][]): boolean => {
	for (const row of board) {
		for (const tile of row) {
			if (tile.value === null) return false
		}
	}
	return true
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
				isSolved: checkIfSolved(updatedBoard),
			}
		},
	},
})

export const { setTile } = gameBoardSlice.actions

export default gameBoardSlice.reducer
