const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/app/Root.jsx', 'webpack-hot-middleware/client'],
  output: {
    path: path.join(__dirname, 'src', 'server', 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, 'src', 'app'),
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: ['react-hot-loader/babel', 'transform-object-rest-spread']
        }
      }
    },
    {
      test: /\.(s*)(a|c)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.(ttf|eot|svg|woff|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: 'file-loader'
    }]
  },
  plugins: [
    new UglifyJsPlugin({
      test: /\.jsx?$/
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};