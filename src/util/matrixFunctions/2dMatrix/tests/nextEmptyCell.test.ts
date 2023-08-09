import { describe, it, expect } from 'vitest'

import { nextEmptyCell } from '../2dMatrix'

describe('nextEmptyCell', () => {
	const board = [
		[
			{ value: 1, immutable: false },
			{ value: 2, immutable: false },
			{ value: 3, immutable: false },
			{ value: 4, immutable: false },
			{ value: null, immutable: false },
			{ value: 6, immutable: false },
			{ value: 7, immutable: false },
			{ value: 8, immutable: false },
			{ value: 9, immutable: false },
		],
		[
			{ value: 1, immutable: false },
			{ value: 2, immutable: false },
			{ value: 3, immutable: false },
			{ value: 4, immutable: false },
			{ value: null, immutable: false },
			{ value: 6, immutable: false },
			{ value: 7, immutable: false },
			{ value: 8, immutable: false },
			{ value: 9, immutable: false },
		],
		[
			{ value: 1, immutable: false },
			{ value: 2, immutable: false },
			{ value: 3, immutable: false },
			{ value: 4, immutable: false },
			{ value: null, immutable: false },
			{ value: 6, immutable: false },
			{ value: 7, immutable: false },
			{ value: 8, immutable: false },
			{ value: 9, immutable: false },
		],
		[
			{ value: 1, immutable: false },
			{ value: 2, immutable: false },
			{ value: 3, immutable: false },
			{ value: 4, immutable: false },
			{ value: null, immutable: false },
			{ value: 6, immutable: false },
			{ value: 7, immutable: false },
			{ value: 8, immutable: false },
			{ value: 9, immutable: false },
		],
		[
			{ value: 1, immutable: false },
			{ value: 2, immutable: false },
			{ value: 3, immutable: false },
			{ value: 4, immutable: false },
			{ value: null, immutable: false },
			{ value: 6, immutable: false },
			{ value: 7, immutable: false },
			{ value: 8, immutable: false },
			{ value: 9, immutable: false },
		],
		[
			{ value: 1, immutable: false },
			{ value: 2, immutable: false },
			{ value: 3, immutable: false },
			{ value: 4, immutable: false },
			{ value: null, immutable: false },
			{ value: 6, immutable: false },
			{ value: 7, immutable: false },
			{ value: 8, immutable: false },
			{ value: 9, immutable: false },
		],
		[
			{ value: 1, immutable: false },
			{ value: 2, immutable: false },
			{ value: 3, immutable: false },
			{ value: 4, immutable: false },
			{ value: null, immutable: false },
			{ value: 6, immutable: false },
			{ value: 7, immutable: false },
			{ value: 8, immutable: false },
			{ value: 9, immutable: false },
		],
		[
			{ value: 1, immutable: false },
			{ value: 2, immutable: false },
			{ value: 3, immutable: false },
			{ value: 4, immutable: false },
			{ value: null, immutable: false },
			{ value: 6, immutable: false },
			{ value: 7, immutable: false },
			{ value: 8, immutable: false },
			{ value: 9, immutable: false },
		],
		[
			{ value: 1, immutable: false },
			{ value: 2, immutable: false },
			{ value: 3, immutable: false },
			{ value: 4, immutable: false },
			{ value: null, immutable: false },
			{ value: 6, immutable: false },
			{ value: 7, immutable: false },
			{ value: 8, immutable: false },
			{ value: 9, immutable: false },
		],
	]
	it('should return the coordinates of the next empty cell', () => {
		const result = nextEmptyCell(board)
		expect(result).toEqual({ row: 0, column: 4 })
	})
	it('should return null if there are no empty cells', () => {
		const fullBoard = [
			[
				{ value: 1, immutable: false },
				{ value: 2, immutable: false },
				{ value: 3, immutable: false },
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
			[
				{ value: 1, immutable: false },
				{ value: 2, immutable: false },
				{ value: 3, immutable: false },
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
			[
				{ value: 1, immutable: false },
				{ value: 2, immutable: false },
				{ value: 3, immutable: false },
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
			[
				{ value: 1, immutable: false },
				{ value: 2, immutable: false },
				{ value: 3, immutable: false },
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
			[
				{ value: 1, immutable: false },
				{ value: 2, immutable: false },
				{ value: 3, immutable: false },
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
			[
				{ value: 1, immutable: false },
				{ value: 2, immutable: false },
				{ value: 3, immutable: false },
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
			[
				{ value: 1, immutable: false },
				{ value: 2, immutable: false },
				{ value: 3, immutable: false },
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
			[
				{ value: 1, immutable: false },
				{ value: 2, immutable: false },
				{ value: 3, immutable: false },
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
			[
				{ value: 1, immutable: false },
				{ value: 2, immutable: false },
				{ value: 3, immutable: false },
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
				{ value: 7, immutable: false },
				{ value: 8, immutable: false },
				{ value: 9, immutable: false },
			],
		]

		const result = nextEmptyCell(fullBoard)
		expect(result).toBe(null)
	})
})
