/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
		colors: {
			transparent: "transparent",
			current: "currentColor",
			"first-color": "hsla(96, 40%, 74%, 0.9)",
			"second-color": "hsla(62, 45%, 77%, 0.9)",
			"third-color": "hsla(41, 35%, 69%, 0.9)",
			"fourth-color": "hsla(20, 38%, 70%, 0.9)",
		},
		container: {
			center: true,
		},
	},
	plugins: [],
}

