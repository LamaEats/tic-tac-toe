const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const {
  NODE_ENV
} = process.env

const devMode = !NODE_ENV || NODE_ENV !== 'production'

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [path.resolve(__dirname, 'app'), 'node_modules', path.resolve('node_modules')],
  },
  entry: './app/index.jsx',
  output: {
    path: path.posix.join(__dirname, 'dist'),
    filename: 'tic-tac-toe.js',
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [{
        from: /\/(.?)+$/,
        to: 'index.html',
      }],
    },
    open: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    watchOptions: {
      poll: false,
    },
    port: 5000,
    publicPath: '/',
    contentBase: 'static',
  },
  context: __dirname,
  devtool: 'eval-source-map',
  mode: NODE_ENV || 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './static'),
      to: '/',
      ignore: ['.*'],
    }]),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(devMode)
    }),
  ],
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `
                @import "${__dirname}/app/_colors.scss";
                @import "${__dirname}/app/_variables.scss";
              `
            }
          },
        ],
      },
    ],
  },
}
