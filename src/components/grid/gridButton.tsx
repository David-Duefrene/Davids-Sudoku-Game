import { useState } from 'react'

import NumberSelect from '../numberSelect/numberSelect'

type GridButtonProps = {
	key?: string
	defaultValue?: number
	row: number
	column: number
}

const GridButton = function GridButton(props: GridButtonProps) {
	const { key, defaultValue } = props
	const [value, setValue] = useState<number | Set<number> | null>(defaultValue || null)
	const [isClicked, setIsClicked] = useState<boolean>(false)

	const canChange = defaultValue === undefined

	return isClicked ?
		<NumberSelect
			close={() => setIsClicked(false)}
			currentValue={value}
			setValue={(num: number | Set<number>) => setValue(num)}
		/> :
		<button
			disabled={canChange}
			onClick={() => setIsClicked(!isClicked)}
			className='bg-fourth-color w-24 h-24'
			key={key} >
				{value}
		</button>

}

export default GridButton
