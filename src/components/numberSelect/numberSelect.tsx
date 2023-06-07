import { ReactNode, useState } from 'react'

type NumberSelectProps = {
	setNumber: (number: number) => void
}

const NumberSelect = function (props: NumberSelectProps) {
	const { setNumber } = props

	const [pencilMode, setPencilMode] = useState<boolean>(true)

	const buttons = []
	for (let i = 1; i <= 9; i++) {
		buttons.push(
			<button
				key={i}
				className='bg-second-color'
				onClick={() => setNumber(i)}
				> {i}
			</button>
		)
	}

	return (
		<div className='grid grid-cols-3 bg-third-color w-full h-full z-50'>
			<button
				className='bg-second-color col-span-3'
				onClick={() => setPencilMode(!pencilMode)}
				>
				{pencilMode ? 'Pencil' : 'Pen'}
			</button>
			{buttons}
		</div>
	)
}

export default NumberSelect
