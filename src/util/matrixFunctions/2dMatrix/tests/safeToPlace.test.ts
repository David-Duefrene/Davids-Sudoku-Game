import { describe, it, expect } from 'vitest'

import { safeToPlace } from '../2dMatrix'
import type { ITile, ICoordinates } from '../2dMatrix'

describe('safeToPlace', () => {
	const board: ITile[][] = [
		[ { value: 1, immutable: false }, { value: 2, immutable: false }, { value: 3, immutable: false } ],
		[ { value: 4, immutable: false }, { value: null, immutable: false }, { value: 6, immutable: false } ],
		[ { value: 7, immutable: false }, { value: 8, immutable: false }, { value: 9, immutable: false } ],
	]

	it('should return true if the number is safe to place in the empty cell', () => {
		const emptyCell: ICoordinates = { row: 1, column: 1 }
		const num = 10

		const result = safeToPlace(board, emptyCell, num)
		expect(result).toBe(true)
	})

	it('should return false if the number is already present in the row', () => {
		const emptyCell: ICoordinates = { row: 1, column: 1 }
		const num = 6

		const result = safeToPlace(board, emptyCell, num)
		expect(result).toBe(false)
	})

	it('should return false if the number is already present in the column', () => {
		const emptyCell: ICoordinates = { row: 1, column: 1 }
		const num = 8

		const result = safeToPlace(board, emptyCell, num)
		expect(result).toBe(false)
	})

	it('should return false if the number is already present in the grid', () => {
		const emptyCell: ICoordinates = { row: 1, column: 1 }
		const num = 1

		const result = safeToPlace(board, emptyCell, num)
		expect(result).toBe(false)
	})
})

