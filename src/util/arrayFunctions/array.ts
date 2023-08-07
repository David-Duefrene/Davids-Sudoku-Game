// Range Function - Generate a range of numbers from 0 to length
export const range = (length: number) => Array.from(Array(length).keys())

// Shuffle an Array
export const shuffle = (array: number[]): number[] => {
	let currentIndex = array.length
	let temporaryValue: number, randomIndex: number

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		temporaryValue = array[currentIndex]
		array[currentIndex] = array[randomIndex]
		array[randomIndex] = temporaryValue
	}

	return array
}

