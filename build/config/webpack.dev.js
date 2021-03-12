const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base')()
const { setBaseCssLoaders } = require('./utils')
const devEnv = require('../../dev.env')
const RUN_MODE = process.env.RUN_MODE

baseConfig.mode = 'development'

if(RUN_MODE === 'example'){
  baseConfig.entry.main = '/example/main.js'
}

baseConfig.devServer = {
  contentBase: '/dist',
  compress: false,
  hot: true,
  host: '0.0.0.0',
  port: 3010,
  proxy: devEnv.proxy,
  quiet: true,
  historyApiFallback: true,
  // 配置跨域请求头，解决开发环境的跨域问题
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}
baseConfig.devtool = 'eval-source-map'
baseConfig.module.rules.push(...setBaseCssLoaders(['scss', 'less', 'postcss']))
baseConfig.plugins.push(new HtmlWebpackPlugin({template: 'index.html'}))
module.exports = baseConfig
