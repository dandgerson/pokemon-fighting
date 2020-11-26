const path = require('path')
// import webpack from 'webpack'
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[name][ext][query]',
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [],
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
                auto: /\.module\.\w+$/i,
              },
            },
          },
          'sass-loader',
        ],
      },
      // {
      //   test: /\.(svg|jpe?g|png|ttf|otf|woff|woff2)$/,
      //   use: {
      //     loader: 'url-loader',
      //   },
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //     },
      //   ],
      // },
      {
        test: /\.(svg|png|jpe?g|gif)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        }
      },
      // {
      //   test: /\.(ttf|otf|woff|woff2)$/,
      //   type: 'asset/resource',
      //   parser: {
      //     dataUrlCondition: {
      //       maxSize: 4 * 1024 // 4kb
      //     }
      //   }
      // },
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      //   options: {
      //     esModule: true,
      //   },
      // },
    ],
  },

  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],

  devServer: {
    port: 3000,
    open: false,
    hot: true,
    historyApiFallback: true,
  },
}
