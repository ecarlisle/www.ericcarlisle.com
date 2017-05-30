'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Paths
const sourcePath = path.resolve(__dirname, 'themes', 'podium', 'static');
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
			'./scss/main.scss',
		],
	},
	output: {
		path: path.resolve(buildPath),
		filename: './js/main.js',
	},
//	watch: true,
	devServer: {
		inline: true,
    contentBase: sourcePath,
  },
  plugins: [
  	new ExtractTextPlugin('./css/main.css'),
  ],
};
