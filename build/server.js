const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./config')

webpackConfig().then(({ devConfig }) => {
  const compiler = webpack(devConfig)
  const server = new WebpackDevServer(compiler, devConfig.devServer)
  const { host, port } = devConfig.devServer
  server.listen(port, host, (error) => {
    if (error) console.log(error)
  })
})
