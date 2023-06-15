import React from 'react'
import ReactDOM from 'react-dom/client'

import GameState from './hooks/useGameState'
import GameBoard from './containers/GameBoard.tsx'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<GameState>
			<GameBoard />
		</GameState>
	</React.StrictMode>,
)
