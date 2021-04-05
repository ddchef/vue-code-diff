const {merge} = require('webpack-merge');
const FirendErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path')
const common = require('./webpack.common')

module.exports = merge(common,{
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    contentBase: path.resolve('public'), // 服务器需要静态文件地址
    contentBasePublicPath: '/public',
    compress: true, // 开启 gzip
    host: '0.0.0.0',
    hot: true,
    inline: true,
    quiet: true,
    overlay:{
      errors: true,
      warnings: true
    },
    progress: true,
    port: 3010,
    proxy: {

    }
  },
  plugins: [
    new FirendErrorsWebpackPlugin()
  ]
})