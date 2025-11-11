import postcssPresetEnv from "postcss-preset-env";
import autoprefixer from "autoprefixer";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore'] }], // Pass pinia options here
  ],
  app:{
    head:{
      title:'浮躁的个人小站', //应用的默认标题
      charset:'utf-8', //设置字符编码
      link:[
        {
          rel:'icon',
          type:'image/x-icon',
          href:'./public/favicon.ico' //设置网站图标
        }
      ],
      viewport:'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no', //设置视口
          //width=device-width:使页面宽度等于设备宽度, initial-scale=1.0：初始缩放比例为1.0, maximum-scale=1.0：最大缩放比例为1.0, user-scalable=no：用户不能缩放页面
      meta:[
      ],
      htmlAttrs:{
        lang:'zh-CN' //设置语言为中文
      },
      script:[
        // {
        //   src:'./_nuxt/app/assets/js/flexible.js', //引入flexible.js文件
        //   type:'text/javascript' //设置脚本类型为text/javascript
        // }
      ]
    }
  },
  css: [
    './app/assets/css/normalize.css',
    './app/assets/scss/_variables.scss'
  ], //全局引入css文件
  vite:{
    css:{
      postcss:{
        plugins:[
          autoprefixer(),
          postcssPresetEnv({
            stage: 3,
          }),
        ]
      },
      preprocessorOptions:{
        scss:{
          loadPaths: ['./app/assets/scss'], //指定scss文件查找路径
          // additionalData: '@use "./app/assets/scss/_variables.scss";' //全局引入scss文件
        }
      }
    }
  },
  build:{
  },
  routeRules: {
    // '/':{ssr:false} //关闭首页的服务端渲染
  },
})