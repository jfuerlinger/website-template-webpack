const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    require('autoprefixer')
  ],
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', /*'postcss-loader',*/ 'sass-loader']
      },
      // {
      //   test: /\.ejs$/,
      //   loader: 'ejs-loader',
      //   exclude: /node-modules/,
      //   query: {
      //     interpolate : /\{\{(.+?)\}\}/g,
      //     evaluate    : /\[\[(.+?)\]\]/g
      //   }
      // },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new HtmlWebPackPlugin({
      pkg: require("./package.json"),
      template: "./src/index.html",
      filename: "./index.html",
      inject: false
    }),
    new WebpackMd5Hash()
  ]
};