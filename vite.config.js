const path = require('path')

module.exports = {
  alias: {
    '@': path.resolve(__dirname, 'src')
  },
  cssPreprocessOptions: {
    sass: {
      prependData: `
        @import "@/assets/scss/_imports.scss";
      `
    }
  }
}