const CracoLessPlugin = require('craco-less');
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@': resolve('./src'),
      '@c': resolve('./src/components'),
      'http': resolve('./src/http'),
      'pages': resolve('./src/pages'),
      'utils':resolve('./src/utils')
    }
  },
  devServer: {
    port:3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        // pathRewrite: { '^/api': '' },
        wx:false
      }
    }
  }
};
