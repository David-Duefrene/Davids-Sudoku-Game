import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import store from './store/store.ts'
import GameBoard from './containers/GameBoard.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<GameBoard />
		</Provider>
	</React.StrictMode>,
)
