export type ITile = {
	value: number | null
	immutable: boolean
}

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

