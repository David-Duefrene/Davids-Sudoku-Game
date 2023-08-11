import { emptyCellCoords, ITile } from '../2dMatrix'

import { describe, it, expect } from 'vitest'

describe('emptyCellCoords', () => {
	it('should return an empty array when the board is filled with non-null values', () => {
		const startingBoard: ITile[][] = [
			[ { value: 1, immutable: false }, { value: 2, immutable: false }, { value: 3, immutable: false } ],
			[ { value: 4, immutable: false }, { value: 5, immutable: false }, { value: 6, immutable: false } ],
			[ { value: 7, immutable: false }, { value: 8, immutable: false }, { value: 9, immutable: false } ],
			[ { value: 1, immutable: false }, { value: 2, immutable: false }, { value: 3, immutable: false } ],
			[ { value: 4, immutable: false }, { value: 5, immutable: false }, { value: 6, immutable: false } ],
			[ { value: 7, immutable: false }, { value: 8, immutable: false }, { value: 9, immutable: false } ],
			[ { value: 1, immutable: false }, { value: 2, immutable: false }, { value: 3, immutable: false } ],
			[ { value: 4, immutable: false }, { value: 5, immutable: false }, { value: 6, immutable: false } ],
			[ { value: 7, immutable: false }, { value: 8, immutable: false }, { value: 9, immutable: false } ],
		]
		const result = emptyCellCoords(startingBoard)
		expect(result).toEqual([])
	})

	it('should return an array with coordinates of all empty cells in the board', () => {
		const startingBoard = [
			[ 1, null, null ],
			[ null, 5, 6 ],
			[ null, 8, 9 ],
			[ 1, 2, 3 ],
			[ 4, 5, 6 ],
			[ 7, 8, 9 ],
			[ 1, 2, 3 ],
			[ 4, 5, 6 ],
			[ 7, 8, 9 ],
		]
		const result = emptyCellCoords(startingBoard)
		expect(result).toEqual([
			{ row: 0, column: 1 },
			{ row: 0, column: 2 },
			{ row: 1, column: 0 },
			{ row: 2, column: 0 },
		])
	})
})

