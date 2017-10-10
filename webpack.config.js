'use strict';

// Node native modules
const path = require('path');

// To access native Webpack plugins
const webpack = require('webpack');

// Webpack plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Hugo variables
const themeName = 'podium';

// Paths
const sourcePath = path.resolve(__dirname, 'themes', themeName, 'static');
const buildPath = path.resolve(__dirname, 'static');
const cssPath = path.resolve(buildPath, 'css');
const jsPath = path.resolve(buildPath, 'js');
const fontPath = path.resolve(buildPath, 'fonts');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				exclude: /node_modules/,
				use: [
					{
						loader: 'jshint-loader'
					}
				],
			},
			{
				test: /\.(scss|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: false,
								minimize: false,
								importLoaders: 2,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [
									require('autoprefixer')(),
									// require('css-mqpacker'),
									// require('cssnano'),
								],
								sourceMap: false,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								outputStyle: 'expanded',
								sourceMap: false,
							}
						},
					],
				}),
			},
			{
				test: /\.(woff|woff2)$/,
				use: {
					loader: 'file-loader',
					options: {
						mimetype: 'application/font-woff',
						name: '/fonts/[name].[ext]',
					},
				},
			},
			{
				test: /\.(ttf)$/,
				use: {
					loader: 'file-loader',
					options: {
						mimetype: 'application/font-ttf',
						name: '/fonts/[name].[ext]',
					},
				},
			},
		], // :rules
	},
	context: sourcePath,
	entry: {
		app: [
			'normalize.css/normalize.css',
			'magnific-popup/dist/magnific-popup.css',
			'./scss/main.scss',
//			'wee-grid/src/wee-grid.scss',
			'./scss/wee-grid.css',
			'magnific-popup',
			'jquery',
			'./js/main.js',
		],
	},
	output: {
		path: path.resolve(buildPath),
		filename: './js/main.js',
	},
	watch: true,
/*
	devServer: {
		inline: true,
		contentBase: sourcePath,
	},
*/
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin([cssPath, jsPath, fontPath], {}),
		new ExtractTextPlugin('./css/main.css'),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
//			{
//				from: {
//					glob: path.resolve(sourcePath, 'img') + '/**/*',
//					to: path.resolve(buildPath, 'img'),
//				},
//			},
//		]),

	],
};
