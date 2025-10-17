import { defineStore } from 'pinia'

export const useWebSettingStore = defineStore('websetting', {
  state: () => ({
    headerTitleInfo:[
        {
            name: '首页',
            path: '/home'
        },
        {
            name: '媒体',
            path: '/media'
        },
        {
            name: '文章',
            path: '/article'
        },
        {
            name: '关于我',
            path: '/about'
        },
    ],
    userAccountInfo: {
        uuid: '' as string,
        user: '' as string ,
        sex: 0 as number,
        age: 0 as number,
        birth: '' as string,
        address: '' as string,
        intro: '' as string,
        avatar: '' as string,
        background: '' as string,
        create_time: '' as string,
        update_time: '' as string,
        login_time: '' as string,
        login_ip: '' as string,
        login_count: 0 as number,
        status: 0 as number,
        last_login_time: '' as string,
        last_login_ip: '' as string,
        last_login_count: 0 as number,
        login_error_count: 0 as number,
        login_error_time: '' as string,
        login_error_ip: '' as string,
        login_error_reason: '' as string,
        login_error_count_max: 0 as number,
        password: '' as string,
        tel: '' as string,
        email: '' as string,
        role: 0 as number,
        city: '' as string,

    }

  }),
  getters: {},
  actions: {

  }
})