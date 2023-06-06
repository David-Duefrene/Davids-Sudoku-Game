import { ReactNode, useState } from 'react'

type GridButtonProps = {
	children?: ReactNode
	key?: string
	defaultValue?: number
}

const GridButton = function GridButton(props: GridButtonProps) {
	const { key } = props
	const [value, setValue] = useState<number | null>(props.defaultValue || null)
	const [isClicked, setIsClicked] = useState<boolean>(false)

	const content = value || props.children

	return (
		<button
			onClick={() => setIsClicked(!isClicked)}
			className='bg-fourth-color w-20 h-20'
			key={key} >
			{content}
		</button>
	)
}

export default GridButton
