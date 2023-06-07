import { ReactNode, useState } from 'react'

import NumberSelect from '../numberSelect/numberSelect'

type GridButtonProps = {
	children?: ReactNode
	key?: string
	defaultValue?: number
}

const GridButton = function GridButton(props: GridButtonProps) {
	const { key, children } = props
	const [value, setValue] = useState<number | Set<number> | null>(props.defaultValue || null)
	const [isClicked, setIsClicked] = useState<boolean>(false)

	const canChange = children === typeof 'number' || children?.length > 0
	const content = value || children

	return isClicked ?
		<NumberSelect
			close={() => setIsClicked(false)}
			currentValue={value}
			setValue={(num: number | Set<number>) => {
				setValue(num)
				setIsClicked(false)
			}}
		/> :
		<button
			disabled={canChange}
			onClick={() => setIsClicked(!isClicked)}
			className='bg-fourth-color w-20 h-20'
			key={key}
		> {content}
		</button>

}

export default GridButton
