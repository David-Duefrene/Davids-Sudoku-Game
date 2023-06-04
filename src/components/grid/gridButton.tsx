import { ReactNode } from "react"

type GridButtonProps = {
	children?: ReactNode
	key?: string
}

const GridButton = function GridButton(props: GridButtonProps) {
	const { key } = props
	return <button className='bg-fourth-color w-20 h-20' key={key}>{props.children}</button>
}

export default GridButton
