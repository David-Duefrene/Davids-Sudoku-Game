module.exports = {
	env: { browser: true, es2021: true },
	extends: [
		'eslint:recommended',
		'eslint-config-vigilant-octo-train',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: [ 'react-refresh' ],
	rules: {
		'@typescript-eslint/no-explicit-any': 'error',
		'react/react-in-jsx-scope': 0,
		'object-curly-newline': [ 'error', {
			'minProperties': 5, 'multiline': true, 'consistent': true,
		} ],
		'react-refresh/only-export-components': 'warn',
	},
}
