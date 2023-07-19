import { useState } from 'react'

import NumberSelect from '../numberSelect/numberSelect'

type GridButtonProps = {
	key?: string
	value: number
	hardValue?: boolean
	unusableValues: Set<number>
	row: number
	column: number
}

const GridButton = function GridButton(props: GridButtonProps) {
	const {
		key, value, row, column, unusableValues, hardValue = false,
	} = props

	const [ isClicked, setIsClicked ] = useState<boolean>(value === 0)

	return isClicked ?
		<NumberSelect
			value={value}
			unusableValues={unusableValues}
			close={() => setIsClicked(false)}
			position={{ row, column }}
		/> :
		<button
			disabled={hardValue}
			onClick={() => setIsClicked(!isClicked)}
			className={`${hardValue? 'bg-slate-500' : 'bg-fourth-color'} w-24 h-24 disabled:opacity-50`}
			key={key} >
			{value === 0 ? null : value}
		</button>
}

export default GridButton
