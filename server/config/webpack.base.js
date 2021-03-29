const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const basePath = process.cwd()
module.exports = {
  mode: 'development',
  entry: {
    main: '/example/main.ts'
  },
  output:{
    path: path.resolve(basePath, 'dist'),
    filename: '[name].bundle.js',
    library: 'vue-code-diff',
    libraryTarget: 'umd',
  },
  module:{
    rules:[
      {
        test: /.vue$/,
        use:[
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test:/\.(jsx?)|(tsx?)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory'
          }
        ]
      },
      // {
      //   test:/\.tsx?$/,
      //   exclude: /(node_modules)/,
      //   use: [
      //     {
      //       loader: 'ts-loader',
      //       options:{
      //         appendTsSuffixTo: [/\.vue$/],
      //         transpileOnly: true
      //       }
      //     }
      //   ]
      // },
    ]
  },
  devtool:'source-map',
  resolve:{
    extensions:['.js','.ts','.tsx','.jsx','.css', '.vue']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}