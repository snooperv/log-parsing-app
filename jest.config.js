module.exports = {
	moduleDirectories: [
		'assets',
		'components',
		'helpers',
		'node_modules',
		'src',
		'store',
		'types'
	],
	moduleFileExtensions: [
		'js',
		'jsx',
		'ts',
		'tsx'
	],
	moduleNameMapper: {
		'\\.(css|less)$': 'identity-obj-proxy',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
	},
	preset: 'ts-jest',
	setupFiles: [
		'<rootDir>/jest-setup.ts'
	],
	setupFilesAfterEnv: [
		'<rootDir>/jest-setup-after-env.ts'
	],
	testEnvironment: 'jsdom',
	testPathIgnorePatterns: [
		'/build/',
		'/node_modules/',
		'/__mocks__/*'
	],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)sx?$',
	transform: {
		'^.+\\.[t|j]sx?$': ['ts-jest', {
			isolatedModules: true
		}]
	},
	verbose: true
};
