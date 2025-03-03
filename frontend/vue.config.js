const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/AI-Portfolio/frontend/dist/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://ai-portfolio-ggcj.onrender.com', // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
