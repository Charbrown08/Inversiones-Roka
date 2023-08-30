const slsw = require('serverless-webpack')
const path = require('path')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'production',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  }
}
