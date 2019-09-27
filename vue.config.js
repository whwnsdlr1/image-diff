const SitemapPlugin = require('sitemap-webpack-plugin').default

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/image-diff/'
  : '/',
  outputDir: './docs',
  devServer: {
    host: '0.0.0.0'
  },
  configureWebpack: {
    plugins: [
      new SitemapPlugin('https://whwnsdlr1.github.io/image-diff/', ['/'], {
        fileName: 'sitemap.xml',
        lastMod: true,
        changeFreq: 'monthly'
      })
    ]
  }
}