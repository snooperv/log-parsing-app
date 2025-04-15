const Autoprefixer = require('autoprefixer');
const {development} = require('./define');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	rules: [
		{
			exclude: /(node_modules|bower_components)/,
			test: /\.tsx?$/,
			use: {
				loader: 'ts-loader',
				options: {
					transpileOnly: development
				}
			}
		},
		{
			test: /\.(css|less)$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: ''
					}
				},
				{
					loader: 'css-loader',
					options: {
						modules: {
							localIdentName: development ? '[path][name]__[local]' : '[hash:base64]'
						},
						sourceMap: development
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								new Autoprefixer()
							]
						},
						sourceMap: development
					}
				},
				{
					loader: 'less-loader',
					options: {
						lessOptions: {
							javascriptEnabled: true
						},
						sourceMap: development
					}
				}
			]
		},
		{
			test: /\.(gif|png|jpg|jpeg|woff|woff2|ttf|eot|svg|ico)$/,
			type: 'asset/resource'
		}
	]
};
