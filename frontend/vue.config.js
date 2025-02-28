const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/AI-Portfolio/' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081', // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
