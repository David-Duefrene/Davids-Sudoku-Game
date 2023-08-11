import {
	vi, describe, beforeEach, it, expect,
} from 'vitest'
import type { Mock } from 'vitest'

import { range } from '../../../arrayFunctions/array'

import { fillFromArray, nextStillEmptyCell, safeToPlace } from '../2dMatrix'
import type { ITile, ICoordinates } from '../2dMatrix'
import FILLEDBOARD from './result.json'

vi.mock('../2dMatrix.ts', async () => {
	const actual: any = await vi.importActual('../2dMatrix.ts')
	return {
		...actual,
		nextStillEmptyCell: vi.fn((r) => r),
		shuffle: vi.fn((r) => r),
		safeToPlace: vi.fn(() => false),
	}
})

describe('fillFromArray', () => {
	const mockNextStillEmptyCell = nextStillEmptyCell as Mock
	const mockShuffle = shuffle as Mock
	const mockSafeToPlace = safeToPlace as Mock

	beforeEach(() => {
		mockNextStillEmptyCell.mockClear()
		mockShuffle.mockClear()
		mockSafeToPlace.mockClear()
	})

	it('should return the starting board if there are no more empty cells', () => {
		const filledBoard: ITile[][] = FILLEDBOARD
		const emptyCellArray: ICoordinates[] = []

		mockNextStillEmptyCell.mockReturnValue(false)
		mockShuffle.mockReturnValue(range(9))
		mockSafeToPlace.mockReturnValue(true)

		const result = fillFromArray(filledBoard, emptyCellArray)
		expect(result).toEqual(filledBoard)
	})

	it('should fill the puzzle correctly', () => {
		const emptyCell1: ICoordinates = { row: 0, column: 0 }
		const emptyCell2: ICoordinates = { row: 1, column: 0 }
		const emptyCellArray: ICoordinates[] = [ emptyCell1, emptyCell2 ]

		mockNextStillEmptyCell
			.mockReturnValueOnce(emptyCell1)
			.mockReturnValueOnce(emptyCell2)

		mockShuffle
			.mockReturnValueOnce(range(9))
			.mockReturnValueOnce(range(9).reverse())

		mockSafeToPlace.mockReturnValue(true)

		const board: ITile[][] = FILLEDBOARD
		board[0][0].value = null
		board[1][0].value = null

		const result = fillFromArray(board, emptyCellArray)

		expect(result).toEqual(FILLEDBOARD)
	})
})

