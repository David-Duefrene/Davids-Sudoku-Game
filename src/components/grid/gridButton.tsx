import { useState } from 'react'

import NumberSelect from '../numberSelect/numberSelect'

type GridButtonProps = {
	key?: string
	value: number | null
	hardValue: boolean
	unusableValues: Set<number>
	setTile: (value: number) => void
}

const GridButton = function GridButton(props: GridButtonProps) {
	const {
		key, value, unusableValues, setTile, hardValue = false,
	} = props

	const [ isClicked, setIsClicked ] = useState<boolean>(!hardValue)

	if (isClicked) {
		return <NumberSelect
			value={value}
			unusableValues={unusableValues}
			setTile={setTile}
			close={() => setIsClicked(false)}
		/>
	}

	let css = `${hardValue ? 'bg-slate-500 rounded-lg border border-gray-800 shadow-md' : 'bg-fourth-color'}`
	css += ' text-center text-2xl font-bold text-white w-full h-full'

	return <button
		disabled={hardValue}
		onClick={() => setIsClicked(!isClicked)}
		className={css}
		key={key} >
		{value}
	</button>
}

export default GridButton
