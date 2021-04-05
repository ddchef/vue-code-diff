const webpack = require('webpack')
const webpackConfig = require('./config/webpack.prod')

webpack(webpackConfig,(err,status)=>{
  if(err) throw err
})
