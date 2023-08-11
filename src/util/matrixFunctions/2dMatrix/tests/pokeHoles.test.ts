import { describe, it, expect } from 'vitest'

import FILLEDBOARD from './result.json'

import { pokeHoles, multiplePossibleSolutions } from '../2dMatrix'
import type { ITile } from '../2dMatrix'

describe('pokeHoles', () => {
	const board: ITile[][] = FILLEDBOARD

	it('should create a puzzle with the specified number of holes and multiple solutions', () => {
		const result = pokeHoles(board, 50)
		let holeCount = 0

		result.forEach((row: ITile[]) => {
			row.forEach((tile: ITile) => {
				if (tile.value === null) holeCount++
			})
		})

		expect(holeCount).toBe(50)
		expect(multiplePossibleSolutions(result)).toBe(false)
	})
})

