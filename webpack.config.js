var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.jsx'
  },

  output: {
    path: `${__dirname}/../app/assets/javascripts/webpack`,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          presets: [
            "es2015",
            "react"
          ]
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "url-loader?prefix=font/&limit=5000"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.gif/,
        loader: "url-loader?limit=10000&mimetype=image/gif"
      },
      {
        test: /\.jpg/,
        loader: "url-loader?limit=10000&mimetype=image/jpg"
      },
      {
        test: /\.png/,
        loader: "url-loader?limit=10000&mimetype=image/png"
      }
    ]
  },

  resolveLoader: {
    moduleExtensions: ['-loader']
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    port: 7000,
    inline: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
}
