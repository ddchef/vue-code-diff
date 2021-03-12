module.exports = {
  presets: [
    [
      '@vue/app'
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',{
        corejs: 3,
      }
    ]
  ]
}
