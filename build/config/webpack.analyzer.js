const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const prodConfig = require('./webpack.prod')

prodConfig.plugins.push(
  new BundleAnalyzerPlugin()
)

module.exports = prodConfig
