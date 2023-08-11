import { describe, it, expect } from 'vitest'

import { getRow, ITile } from '../2dMatrix'

// Sample board for testing (2 rows x 3 columns)
const testBoard: ITile[][] = [
	[
		{ value: 1, immutable: true },
		{ value: null, immutable: true },
		{ value: 3, immutable: true },
	],
	[
		{ value: null, immutable: true },
		{ value: 5, immutable: true },
		{ value: 6, immutable: true },
	],
]

describe('getRow', () => {
	it('should return an array with values from the specified row', () => {
		// Test for the first row (index 0)
		const row0Result = getRow(0, testBoard)
		expect(row0Result).toEqual([ 1, 3 ])

		// Test for the second row (index 1)
		const row1Result = getRow(1, testBoard)
		expect(row1Result).toEqual([ 5, 6 ])
	})

	it('should return an empty array if the row is out of bounds', () => {
		// Test for a row that doesn't exist (index 2, out of bounds)
		const row2Result = getRow(2, testBoard)
		expect(row2Result).toEqual([])
	})

	it('should return an empty array if the row has no values', () => {
		// Test for an empty row (all tiles have a value of null)
		const emptyRowResult = getRow(0, [
			[
				{ value: null, immutable: true },
				{ value: null, immutable: true },
			],
		])
		expect(emptyRowResult).toEqual([])
	})
})
