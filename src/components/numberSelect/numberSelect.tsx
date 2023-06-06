import { ReactNode, useState } from 'react'

type NumberSelectProps = {
	setNumber: (number: number) => void
}

const NumberSelect = function numberSelect(props: NumberSelectProps) {
	const { setNumber } = props

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
		<div className='grid grid-cols-3 bg-third-color w-full h-full'>
			{buttons}
		</div>
	)
}

export default NumberSelect
