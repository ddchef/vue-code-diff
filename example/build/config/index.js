const portfinder = require('portfinder')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const webpackProdConfig = require('./webpack.prod')
const webpackDevConfig = require('./webpack.dev')

module.exports = async () => {
  portfinder.basePort = 3010
  const port = await portfinder.getPortPromise()
  webpackDevConfig.devServer.port = port

  webpackDevConfig.plugins.push(
    new FriendlyErrorsWebpackPlugin(
      {
        compilationSuccessInfo: {
          messages: [`You application is running here http://localhost:${port}`]
        }
      }
    )
  )
  webpackDevConfig.plugins.push(new ProgressBarWebpackPlugin({
    format: `:msg [${chalk.green(':bar')}]${chalk.yellow.bold(':percent')} (:elapseds)`,
    complete: ':',
    incomplete: ' '
  }))
  return {
    devConfig: webpackDevConfig,
    prodConfig: webpackProdConfig
  }
}
