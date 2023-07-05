import { configureStore } from '@reduxjs/toolkit'
import gameBoardSlice from './slices/gameBoardSlice'

export const store = configureStore({
	reducer: {
		gameState: gameBoardSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
