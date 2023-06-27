import { createSlice } from '@reduxjs/toolkit'


export type IGameBoardState = {
	board: number[][]
}


const initialState: IGameBoardState = {
	board: Array.from({ length: 9 }, () => Array(9).fill(null)),
}

export const gameBoardSlice = createSlice({
	name: 'gameBoard',
	initialState,
	reducers: {
		setTile: (state, action) => {
			state.board[action.payload.col][action.payload.row] = action.payload.value
		}
	}
})

export const { setTile } = gameBoardSlice.actions

export default gameBoardSlice.reducer
