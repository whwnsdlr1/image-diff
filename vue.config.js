module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/image-diff/'
  : '/',
  outputDir: './docs',
  devServer: {
    host: '0.0.0.0'
  }
}