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
		// TypeScript
		'@typescript-eslint/no-explicit-any': 'error',
		/*
		 * JavaScript
		 * Max line length 120
		 */
		'max-len': [ 'error', { code: 120 } ],
		'no-console': 'off',
		'implicit-arrow-linebreak': 'off',
		'object-curly-newline': [
			'error',
			{
				minProperties: 5,
				multiline: true,
				consistent: true,
			},
		],
		// React
		'react/react-in-jsx-scope': 'off',
		'react-refresh/only-export-components': 'warn',
	},
}
