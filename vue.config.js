const path = require("path");

module.exports =  {
  publicPath:'./',

  outputDir:'build',

  // 本地跨域配置
  // devServer: {
  //   // 配置跨域代理
  //   proxy: {
  //     "api/": {//将http://baidui.com"映射为/api
  //       target: "http://192.168.0.248:8204/",//需要代理的baserurl，目标地址
  //       changeOrigin: true, //本地会虚拟一个服务端接收你的请求并代你发送该请求
  //       pathRewrite: {
  //         "^/api": "" //重写路径，比如将api/aa/bb重写为aa/bb
  //       },
  //       logLevel: "debug"//可以在终端打印日志
  //     }
  //   }
  // },

 
  
  //配置全局引入路径
  chainWebpack:config => {
    config.resolve.alias
      .set('@components',path.join(__dirname,'./src/components'))
      .set('@common',path.join(__dirname,'./common'))
      .set('@views',path.join(__dirname,'./src/views'))
  }
}