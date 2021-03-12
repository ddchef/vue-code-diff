const webpack = require('webpack')
const ora = require('ora')
const chalk = require('chalk')
const webpackConfig = require('./config')

webpackConfig().then(({ prodConfig }) => {
  const isAnalyzer = process.argv[2] === 'analyzer'
  if (isAnalyzer) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    prodConfig.plugins.push(
      new BundleAnalyzerPlugin()
    )
  }
  const spinner = ora('Builing for production...').start()
  webpack(prodConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      modules: false,
      colors: true,
      // 添加 children 信息
      children: false,
      // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
      chunks: false,
      // 将构建模块信息添加到 chunk 信息
      chunkModules: false
    }) + '\n\n')
    if (stats.hasErrors()) {
      console.log(chalk.red('Build failed with errors.\n'))
      process.exit(1)
    }
    console.log(chalk.cyan('Build complete.\n'))
    if (!isAnalyzer) process.exit(0)
  })
})
