const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const { ProvidePlugin } = require('webpack')
const EslintPlugin = require('eslint-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const basePath = process.cwd()
const { name: pageName } = require(path.join(basePath, 'package.json'))

module.exports = () => ({
  entry: {
    main: '/src/main.js'
  },
  output: {
    path: path.join(basePath, 'dist'),
    filename: `static/js/[name].js`
  },
  module: {
    rules: [
      {
        test: /\.(vue)$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader?cacheDirectory'
          }
        ],
        exclude (filePath) {
          return (
            /node_modules/.test(filePath) &&
            !/@ailpha(\\|\/)ml/.test(filePath)
          )
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              outputPath: 'static/images',
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(svg|woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/fonts'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.join(process.cwd(), 'src'),
      vue$: process.env.NODE_ENV === 'production' ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.esm.js'
    },
    fallback: {
      timers: false,
      http: false,
      url: false,
      util: false,
      os: false,
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify')
    },
    extensions: ['.js', '.vue', '.json', '.jsx', '.css']
  },
  plugins: [
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}']
    }),
    new EslintPlugin(),
    new ProvidePlugin({
      process: 'process',
      Buffer: ['buffer', 'Buffer']
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
  }
})
