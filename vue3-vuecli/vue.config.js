const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: config => {
    config.devtool = 'cheap-module-source-map'
  },
  /* chainWebpack: config => {
    config.module
      .rule('compile')
        .test(/\.(tsx|ts|jsx|js|cjs|mjs)$/)
        .include
          .add('src', 'node_modules')
          .end()
        .use('babel')
          .loader('babel-loader')
          .options({
            presets: [
              ['@babel/preset-env', { modules: false }]
            ]
          });
  } */
})
