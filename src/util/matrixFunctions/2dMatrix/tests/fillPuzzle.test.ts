import {
	vi, describe, it, expect,
} from 'vitest'
import validResult from './result.json'
import { fillPuzzle } from '../2dMatrix'

// Mock nextEmptyCell, shuffle, and safeToPlace from ../2dMatrix.ts
vi.mock('../../../arrayFunctions/array.ts', async () => {
	const actual: any = await vi.importActual('../../../arrayFunctions/array.ts')
	return {
		...actual,
		shuffle: vi.fn((r) => r),
	}
})

describe('fillPuzzle', () => {
	it('should return a completed puzzle', () => {
		const result = fillPuzzle()

		expect(result).toEqual(validResult)
	})

	it('should return startingBoard if it is already completed', () => {
		const result = fillPuzzle(validResult)
		expect(result).toEqual(validResult)
	})
})

