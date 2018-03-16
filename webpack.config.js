const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app/Root.jsx',
  output: {
    path: path.join(__dirname, 'src', 'server', 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
