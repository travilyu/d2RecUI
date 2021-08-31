const resolve = (...dirs) => require('path').resolve(__dirname, ...dirs)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  publicPath: '/',
  configureWebpack: {
    entry: {
      index: 'src/main.js',
      list: 'src/list.js',
    },
    resolve: {
      alias: {
        src: resolve('src'),
        js: resolve('src/js'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        baseUrl: '/',
        title: '系统',
        filename: 'index.html',
        template: 'public/index.html',
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        baseUrl: '/',
        title: '系统',
        filename: 'list.html',
        template: 'public/index.html',
        chunks: ['list']
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/assets/d2img/', to: 'd2img/' }
        ]
      })
    ]
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('vue-loader-v16')
      .loader('vue-loader-v16')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },

}