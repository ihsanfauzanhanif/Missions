const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})
module.exports = {
  devServer: {
    port: 8080,
    host: '0.0.0.0'
  }
}
module.exports = {
  chainWebpack: config => {
      config
          .plugin('html')
          .tap(args => {
              args[0].title = "Personal Profile - 201524011 Ihsan Fauzan Hanif";
              return args;
          })
  }
}