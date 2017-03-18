var webpack = require('webpack');
module.exports = {
  entry: [
    './js/index.js'
  ],
  output: {
    path: __dirname,
    filename: "dist/app.js"
  }, 
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        loader: 'babel-loader',
        
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
