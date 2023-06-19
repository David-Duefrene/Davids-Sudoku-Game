import { useContext, createContext, ReactElement } from 'react'

const BOARDSIZE = 9

type GameStateProps = {
	children: ReactElement[] | ReactElement
}

export type GameStateType = {
	board: number[][]
	getRow: (row: number) => number[]
	getColumn: (column: number) => number[]
	setTile: (row: number, column: number, value: number) => void
}

const gameState = {
	board: Array.from({ length: BOARDSIZE }, () => Array(BOARDSIZE).fill(null)),
	getRow: function(row: number) { return this.board[row] },
	getColumn: function(column: number) { return this.board.map((row) => row[column]) },
	setTile: function(row: number, column: number, value: number) {
		this.board[row][column] = value
	}
}

export const GameStateContext: React.Context<GameStateType> = createContext(gameState)

export const GameState = ({ children }: GameStateProps) => {
	const currentState = useContext(GameStateContext)

	return <GameStateContext.Provider value={currentState} >{children}</GameStateContext.Provider>
}

export default GameState
