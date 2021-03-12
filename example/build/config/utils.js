const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssLoader = {
  less: {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true,
      strictMath: false
    }
  },
  scss: {
    loader: 'sass-loader'
  },
  postcss: {
    loader: 'postcss-loader'
  }
}
function baseCssLoader (type, prod) {
  return {
    test: new RegExp(`\.(${type})$`),
    use: [
      prod
        ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          }
        : 'style-loader',
      'css-loader',
      'postcss-loader',
      cssLoader[type]
    ]
  }
}

function setBaseCssLoaders (types = [], prod = false) {
  return [
    {
      test: /\.(css)$/,
      use: [
        prod
          ? {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../../'
              }
            }
          : 'style-loader',
        'css-loader'
      ]
    },
    ...types.map(type => baseCssLoader(type, prod))
  ]
}

module.exports = {
  setBaseCssLoaders
}
