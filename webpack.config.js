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
          		}
          	},
						{
							loader: 'postcss-loader',
							options: {
								plugins: (loader) => [
									require('autoprefixer')(),
									require('cssnano'),
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
		],
	},
	context: sourcePath,
	entry: {
		app: [
			'./js/main.js',
      'purecss',
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
  	new ExtractTextPlugin('./css/main.css'),
    new copyWebpackPlugin([
      {
        from: {
          glob:'images/**/*', 
          dot: true,
        to: 'images/[name].[ext]',
        },
      },
    ]),
  ],
};
