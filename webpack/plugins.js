const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {version} = require('../package.json');

const plugins = [
	new MiniCssExtractPlugin({
		chunkFilename: '[id].css',
		filename: '[contenthash].css'
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		meta: {
			version
		},
		template: './src/index.html',
		title: 'Log Parsing App'
	})
];

module.exports = plugins;
