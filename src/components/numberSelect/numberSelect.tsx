import { useState } from 'react'

type NumberSelectProps = {
	value: number | null
	unusableValues: Set<number>
	close: () => void
	setTile: (value: number) => void
}

const NumberSelect = function (props: NumberSelectProps) {
	const { value, unusableValues, close, setTile } = props

	const [ pencilMode, setPencilMode ] = useState<boolean>(true)
	const [ pencilValue, setPencilValue ] = useState<Set<number>>(new Set())

	const buttons = []
	for (let i = 1; i <= 9; i++) {
		const hasIndex = pencilValue.has(i)

		buttons.push(
			<button
				key={i}
				className={hasIndex ? 'invert' : 'bg-second-color disabled:opacity-50'}
				disabled={unusableValues.has(i) && value !== i}
				onClick={() => {
					if (!pencilMode) {
						setTile(i)
						close()
						return
					}

					if (pencilValue.has(i)) {
						pencilValue.delete(i)
					} else {
						pencilValue.add(i)
					}
					setPencilValue(new Set(pencilValue))
				}} >
				{i}
			</button>,
		)
	}

	return (
		<div className='grid grid-cols-3 bg-third-color flex justify-center items-center'>
			<button
				className='bg-second-color col-span-2'
				onClick={() => setPencilMode(!pencilMode)} >
				{pencilMode ? 'Pencil' : 'Pen'}
			</button>
			<button className='bg-second-color' onClick={close}>X</button>
			{buttons}
		</div>
	)
}

export default NumberSelect
