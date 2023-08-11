import { describe, it, expect } from 'vitest'

import { multiplePossibleSolutions } from '../2dMatrix'

import type { ITile } from '../2dMatrix'

import FILLEDBOARD from './result.json'

describe('multiplePossibleSolutions', () => {
	it('should return false if there is only one possible solution', () => {
		const board: ITile[][] = FILLEDBOARD

		const result: boolean = multiplePossibleSolutions(board)
		expect(result).toBe(false)
	})
})

