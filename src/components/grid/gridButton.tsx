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

	const [isClicked, setIsClicked] = useState<boolean>(!hardValue)

	return isClicked ?
		<NumberSelect
			value={value}
			unusableValues={unusableValues}
			setTile={setTile}
			close={() => setIsClicked(false)}
		/> :
		<button
			disabled={hardValue}
			onClick={() => setIsClicked(!isClicked)}
			className={`${hardValue ? 'bg-slate-500' : 'bg-fourth-color'} w-24 h-24 disabled:opacity-50`}
			key={key} >
			{value}
		</button>
}

export default GridButton
