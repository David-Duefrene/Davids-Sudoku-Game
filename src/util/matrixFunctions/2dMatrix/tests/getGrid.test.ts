import { describe, it, expect } from 'vitest'

import { getGrid, ITile } from '../2dMatrix'

describe('getGrid', () => {
	it('should return an empty grid when all tiles are null', () => {
		const board: ITile[][] = [
			[
				{ value: null, immutable: false },
				{ value: null, immutable: false },
				{ value: null, immutable: false },
			],
			[
				{ value: null, immutable: false },
				{ value: null, immutable: false },
				{ value: null, immutable: false },
			],
			[
				{ value: null, immutable: false },
				{ value: null, immutable: false },
				{ value: null, immutable: false },
			],
		]
		const grid = getGrid(0, 0, board)
		expect(grid).toEqual([])
	})

	it('should return a grid with all non-null values in the correct 3x3 section', () => {
		const board: ITile[][] = [
			[
				{ value: 1, immutable: false },
				{ value: 2, immutable: false },
				{ value: 3, immutable: false },
			],
			[
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
			],
			[
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
		]
		const grid = getGrid(1, 1, board) // Center of the board (value 5)
		expect(grid).toEqual([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
	})

	it('should return a grid with only non-null values from the specified 3x3 section', () => {
		const board: ITile[][] = [
			[
				{ value: 1, immutable: false },
				{ value: null, immutable: false },
				{ value: 3, immutable: false },
			],
			[
				{ value: null, immutable: false },
				{ value: 5, immutable: false },
				{ value: null, immutable: false },
			],
			[
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
			[
				{ value: 2, immutable: false },
				{ value: null, immutable: false },
				{ value: 3, immutable: false },
			],
			[
				{ value: null, immutable: false },
				{ value: 4, immutable: false },
				{ value: null, immutable: false },
			],
			[
				{ value: 7, immutable: false },
				{ value: 6, immutable: false },
				{ value: 9, immutable: false },
			],
		]
		const grid = getGrid(0, 1, board) // Top-center of the board
		expect(grid).toEqual([ 1, 3, 5, 7, 8, 9 ])
	})
})
