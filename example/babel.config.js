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
    ],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
