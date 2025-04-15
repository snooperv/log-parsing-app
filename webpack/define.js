const {resolve} = require('path');

const build = resolve(__dirname, '../build/');
const environment = process.env.NODE_ENV;
const development = environment === 'development';
const production = environment === 'production';
const src = resolve(__dirname, '../src');

module.exports = {
	build,
	development,
	mode: environment,
	production,
	src
};
