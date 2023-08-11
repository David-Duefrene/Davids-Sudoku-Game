import { describe, it, expect } from 'vitest'

import { shuffle } from '../array'

describe('shuffle', () => {
	it('should return the same array if the input array has only one element', () => {
		const inputArray = [ 1 ]
		const result = shuffle(inputArray)
		expect(result).toEqual([ 1 ])
	})

	it('should return an array with the same elements but in a different order', () => {
		const result = shuffle([ 1, 2, 3, 4, 5 ])
		expect(result).toHaveLength(5)
		expect(result).not.toEqual([ 1, 2, 3, 4, 5 ]) // The shuffled array should have a different order
	})

	it('should handle empty arrays', () => {
		const inputArray: number[] = []
		const result = shuffle(inputArray)
		expect(result).toEqual([])
	})

	it('should shuffle large arrays randomly', () => {
		const inputArray = Array.from({ length: 1000 }, (_, index) => index)
		const result = shuffle([ ...inputArray ])
		expect(result).not.toEqual(inputArray)
	})
})

