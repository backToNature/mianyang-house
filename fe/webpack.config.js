var path = require('path')
var webpack = require('webpack')
var cleanWebpackPlugin = require('clean-webpack-plugin')
var copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    vendor: ['vue', 'element-ui', 'vue-router'],
    index: './src/components/index/entry.js'
  },
  output: {
    filename: '[name].js',
    publicPath: '/dist/',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
          test: /\.vue$/,
          loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
              name: '[name].[ext]?[hash]'
          }
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
          loader: 'file-loader'
      },
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: '[name].js'}),
    new cleanWebpackPlugin(['dist'], {
      verbose: true, // logs
      dry: false, // Use boolean 'true' to test/emulate delete
      exclude: ['public/lib']
    })
  ],
  resolve: {
      alias: {
          'vue$': 'vue/dist/vue.esm.js'
      }
  },
  performance: {
      hints: false
  },
  devtool: '#eval-source-map'
}


if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
