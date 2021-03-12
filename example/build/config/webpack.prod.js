const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base')()
const { setBaseCssLoaders } = require('./utils')

baseConfig.mode = 'production'
  baseConfig.plugins.push(
    new CleanWebpackPlugin()
  )
  baseConfig.module.rules.push(...setBaseCssLoaders(['scss', 'less', 'postcss'], true))
  baseConfig.plugins.push(new MiniCssExtractPlugin({
    filename: 'static/css/[name].[fullhash:10].css'
  }))
  baseConfig.plugins.push(new HtmlWebpackPlugin({template: 'index.html'}))
  baseConfig.optimization.splitChunks = {
    minSize: 1024 * 30,
    cacheGroups: {
      default: {
        name: 'common',
        chunks: 'initial',
        minChunks: 2,
        priority: -20
      },
      vendors: {
        test: /\/node_modules\//,
        name: 'vendor',
        chunks: 'initial',
        priority: -10
      }
    }
  }

module.exports = baseConfig
