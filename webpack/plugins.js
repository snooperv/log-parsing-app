const DotenvWebpack = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const {version} = require('../package.json');

const plugins = [
	new DotenvWebpack(),
	new ModuleFederationPlugin({
		exposes: {'./EmbeddedApp': './src/components/App'},
		filename: 'remoteEntry.js',
		name: 'embeddedApp',

		/**
		 * Зависимости, которые при сборке будут вынесены в отдельные чанки.
		 * При запуске в качестве микрофронтенда в контексте хост-приложения будут использоваться его соответствующие чанки,
		 * собственные чанки подгружаться не будут.
		 */
		shared: {
			'@reduxjs/toolkit': {
				requiredVersion: '>=1.9.5',
				singleton: true
			},
			'react': {
				requiredVersion: '>=18.2.0',
				singleton: true
			},
			'react-dom': {
				requiredVersion: '>=18.2.0',
				singleton: true
			},
			'react-redux': {
				requiredVersion: '>=8.1.1',
				singleton: true
			},
			'react/jsx-runtime': {
				requiredVersion: '>=18.2.0',
				singleton: true
			}
		}
	}),
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
		title: 'SMP Embedded Application'
	})
];

module.exports = plugins;
