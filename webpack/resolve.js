const {src} = require('./define');
const {resolve} = require('path');

module.exports = {
	alias: {
		'assets': resolve(src, 'assets'),
		'components': resolve(src, 'components'),
		'helpers': resolve(src, 'helpers'),
		'mock': resolve(src, 'mock'),
		'store': resolve(src, 'store'),
		'types': resolve(src, 'types')
	},
	extensions: ['.ts', '.tsx', '.js', 'jsx']
};
