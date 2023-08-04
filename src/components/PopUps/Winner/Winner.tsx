interface IPopupWindowProps {
	isOpen?: boolean
}

const PopupWindow = (props: IPopupWindowProps) => {
	const { isOpen = false } = props

	return isOpen ?
		<div
			className='fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50'
			data-testid='popup-backscreen'>
			<div className='p-6 rounded shadow-md bg-fourth-color' data-testid='popup-window'>
				<h2 className='text-xl font-bold mb-4'>Winner</h2>
				<p className='mb-4'>
					You have completed the puzzle!
				</p>
				<button
					className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => {
						window.location.reload()
						return
					}}
				>
					Reload
				</button>
			</div>
		</div > :
		null
}

export default PopupWindow
