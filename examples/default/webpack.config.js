const path = require('path');
const MixspaWebpackPlugin = require('../../src');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
      { 
        test: /\.css$/, 
        use: [MiniCssExtractPlugin.loader, 'css-loader'] 
      },
      { 
        test: /\.png$/, 
        loader: 'file-loader' 
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[hash].css', chunkFilename: '[id].[hash].css' }),
    new MixspaWebpackPlugin({ 
      id: 'example.id',
      tag: 'example-tag',
      publicPath: '/assets/'
    })
  ]
};