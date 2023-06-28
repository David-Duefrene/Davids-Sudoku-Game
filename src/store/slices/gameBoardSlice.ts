import { createSlice } from '@reduxjs/toolkit'

export type IGameBoardState = {
	board: number[][]
}

const initialState: IGameBoardState = {
	board: Array.from({ length: 9 }, () => Array(9).fill(null)),
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
