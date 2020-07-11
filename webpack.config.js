const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
  NODE_ENV
} = process.env

const devMode = !NODE_ENV || NODE_ENV !== 'production'

module.exports = (env) => {
  return {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
      modules: [path.resolve(__dirname, 'app'), 'node_modules', path.resolve('node_modules')],
    },
    entry: {
      'tic-tac-toe': './app/index.tsx',
      vendors: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk']
    },
    output: {
      path: path.posix.join(__dirname, 'dist'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
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
      new HtmlWebpackPlugin({
        scriptLoading: 'defer',
        template: 'static/index.html',
        inject: false,
        title: 'Tic Tac Toe Game',
      }),
      devMode && new webpack.HotModuleReplacementPlugin,
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[name].[hash].css',
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(devMode),
        __SIDE_SIZE__: env != null ? JSON.stringify(Number(env.size)) : null,
        __LINE_SIZE__: env != null ? JSON.stringify(Number(env.line)) : null,
      }),
      new CheckerPlugin
    ],
    module: {
      rules: [{
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'awesome-typescript-loader',
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
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
}
