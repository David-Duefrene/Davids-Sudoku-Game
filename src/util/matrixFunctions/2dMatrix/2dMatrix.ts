export type ITile = { value: number | null; immutable: boolean };

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
