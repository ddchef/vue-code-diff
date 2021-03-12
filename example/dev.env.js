module.exports = {
  baseUrl: '',
  proxy: {
    '/api': {
      target: 'http://localhost:8903',
      changeOrigin: true
    }
  }
}
