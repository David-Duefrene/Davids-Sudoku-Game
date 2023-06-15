import { useContext, createContext, ReactElement } from 'react'

const BOARDSIZE = 9


type GameStateProps = {
	children: ReactElement[] | ReactElement
}

export type GameStateType = {
	board: number[][]
	getRow: (row: number) => number[]
	getColumn: (column: number) => number[]
}

const gameState = {
	board: Array(BOARDSIZE).fill(Array(BOARDSIZE).fill([])),
	getRow: function(row: number) { return this.board[row] },
	getColumn: function(column: number) { return this.board.map((row) => row[column]) },
}


export const Context: React.Context<GameStateType> = createContext(gameState)

export const GameState = ({ children }: GameStateProps) => {
	const currentState = useContext(Context)

	return <Context.Provider value={currentState} >{children}</Context.Provider>
}

export default GameState
