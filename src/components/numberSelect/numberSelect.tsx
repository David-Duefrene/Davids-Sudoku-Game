import { useState } from 'react'

type NumberSelectProps = {
	setValue: (number: number | Set<number> ) => void
	currentValue?: number | Set<number> | null
	close: () => void
}

const NumberSelect = function (props: NumberSelectProps) {
	const { setValue, currentValue, close } = props

	const [pencilMode, setPencilMode] = useState<boolean>(true)
	const [rerender, setRerender] = useState<boolean>(false)
	const clicked = () => pencilMode ? {} : close()

	const buttons = []
	for (let i = 1; i <= 9; i++) {
		const hasIndex = currentValue instanceof Set && currentValue.has(i)
		buttons.push(
			<button
				key={i}
				className={hasIndex ? 'invert' : 'bg-second-color '}
				onClick={() => {
					if (pencilMode) {
						if (currentValue instanceof Set) {
							if (currentValue.has(i)) {
								currentValue.delete(i)
							} else {
								currentValue.add(i)
							}
						} else {
							setValue(new Set([i]))
						}
					} else {
						setValue(i)
					}
					setRerender(!rerender)
					clicked()
				}}
			> {i}
			</button>
		)
	}

	return (
		<div className='grid grid-cols-3 bg-third-color w-full h-full z-50'>
			<button
				className='bg-second-color col-span-2'
				onClick={() => setPencilMode(!pencilMode)}
				>
				{pencilMode ? 'Pencil' : 'Pen'}
			</button>
			<button className='bg-second-color' onClick={close}>X</button>
			{buttons}
		</div>
	)
}

export default NumberSelect
