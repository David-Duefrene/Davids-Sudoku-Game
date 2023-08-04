import { render, screen } from '@testing-library/react'

import {
	describe, test, expect, vi, beforeAll,
} from 'vitest'

import Winner from './Winner'

describe('PopupWindow component', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { reload: vi.fn() },
		})
	})

	test('renders the popup window when isOpen is true', () => {
		render(<Winner isOpen />)

		// Check if the popup window is rendered
		const popupWindow = screen.getByTestId('popup-window')
		expect(popupWindow).toBeTruthy()

		// Check if the popup backscreen is rendered
		const popupBackscreen = screen.getByTestId('popup-backscreen')
		expect(popupBackscreen).toBeTruthy()

		// Check if the content elements are present
		const titleElement = screen.getByText(/Winner/i)
		expect(titleElement).toBeTruthy()

		const messageElement = screen.getByText(/You have completed the puzzle!/i)
		expect(messageElement).toBeTruthy()

		const reloadButton = screen.getByText(/Reload/i)
		expect(reloadButton).toBeTruthy()
	})

	test('does not render the popup window when isOpen is false', () => {
		render(<Winner />)

		// Check if the popup window is not rendered
		const popupWindow = screen.queryByTestId('popup-window')
		expect(popupWindow).toBeNull()

		// Check if the content elements are not present
		const titleElement = screen.queryByText(/Winner/i)
		expect(titleElement).toBeNull()

		const messageElement = screen.queryByText(/You have completed the puzzle!/i)
		expect(messageElement).toBeNull()

		const reloadButton = screen.queryByText(/Reload/i)
		expect(reloadButton).toBeNull()
	})

	test('calls window.location.reload() when the "Reload" button is clicked', () => {
		render(<Winner isOpen />)

		// Get the "Reload" button and simulate a click
		const reloadButton = screen.getByText(/Reload/i)

		reloadButton.click()

		// Assert that window.location.reload() was called
		expect(window.location.reload).toHaveBeenCalled()
	})
})

