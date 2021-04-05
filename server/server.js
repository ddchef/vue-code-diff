const webpack =require('webpack');
const WebpackDevServer = require('webpack-dev-server')
const getPort =require('get-port');
const webpackConfig = require('./config/webpack.dev')

getPort({port: getPort.makeRange(3010,3020)}).then(port=>{
  const devServerOptions = Object.assign({},webpackConfig.devServer,{port})
  const compiler = webpack(webpackConfig)
  const server = new WebpackDevServer(compiler,devServerOptions)
  server.listen(port,devServerOptions.host,()=>{
    console.log(`Starting server on http://localhost:${port}`)
  })
})