'use strict';

// Node native modules
const path = require('path');

// To access native Webpack plugins
const webpack = require('webpack');

// Webpack plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

// Hugo variables
const themeName = 'podium';

// Paths
const sourcePath = path.resolve(__dirname, 'themes', themeName, 'static');
const buildPath = path.resolve(__dirname, 'static');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [
									require('autoprefixer')(),
									// require('cssnano'),
								],
								sourceMap: true,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
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
			'./js/main.js',
			'purecss/build/pure.css',
			'purecss/build/grids-responsive.css',
			'./scss/main.scss',
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
		new CleanWebpackPlugin(buildPath, {}),
		new ExtractTextPlugin('./css/main.css'),
		new copyWebpackPlugin([
			{
				from: {
					glob: path.resolve(sourcePath, 'img') + '/**/*',
					to: path.resolve(buildPath, 'img'),
				},
			},
		]),
	],
};
