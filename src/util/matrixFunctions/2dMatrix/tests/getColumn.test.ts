import { describe, it, expect } from 'vitest'

import { getColumn, ITile } from '../2dMatrix'

describe('getColumn', () => {
	it('should return an empty column when all tiles are null', () => {
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
		const column = getColumn(0, board)
		expect(column).toEqual([])
	})

	it('should return a column with all non-null values', () => {
		const board: ITile[][] = [
			[
				{ value: 1, immutable: false },
				{ value: null, immutable: false },
				{ value: 3, immutable: false },
			],
			[
				{ value: 4, immutable: false },
				{ value: 5, immutable: false },
				{ value: 6, immutable: false },
			],
			[
				{ value: 7, immutable: false },
				{ value: null, immutable: false },
				{ value: 9, immutable: false },
			],
		]
		const column = getColumn(1, board)
		expect(column).toEqual([ 5 ])
	})
})
