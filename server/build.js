const webpack = require('webpack')
const webpackConfig = require('./config/index')

webpack(webpackConfig,(err,status)=>{
  if(err) throw err
})
