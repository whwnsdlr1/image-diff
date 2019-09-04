module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/image-diff/'
  : '/',
  outputDir: './docs'
}