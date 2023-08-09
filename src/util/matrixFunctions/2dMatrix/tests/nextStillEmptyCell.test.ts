import { describe, expect, it } from 'vitest'

import { nextStillEmptyCell } from '../2dMatrix'
import type { ICoordinates, ITile } from '../2dMatrix'

import validResult from './result.json'

describe('nextStillEmptyCell', () => {
	it('should return false if there are no empty cells', () => {
		const emptyCellArray: ICoordinates[] = []

		const result = nextStillEmptyCell(validResult, emptyCellArray)
		expect(result).toBe(false)
	})

	it('should return the next empty cell', () => {
		const startingBoard: ITile[][] = validResult
		startingBoard[0][0].value = null
		startingBoard[0][0].immutable = false

		const empty = { row: 0, column: 0 }

		const result = nextStillEmptyCell(startingBoard, [ empty ])
		expect(result).toEqual(empty)
	})
})

