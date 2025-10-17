import { defineStore } from 'pinia'
import axios from 'axios'


export const useLoginStore = defineStore('login', {
  state: () => ({
      loginname: '' as string ,
      loginpassword: null as string | null ,
      loginmessage: '' as string ,
      logintoken: '' as string ,
      registername: null as string | null ,
      registerpassword: null as string | null ,
      registeremail: null as string | null ,
      code: 0  as number ,
      email: null as string | null,
      successUser: '' as string ,
  }),
  getters: {
  },
  actions: {
    //以下是登录相关的函数
    async userLogin() {
      const res = await axios.post('http://localhost:3600/login', { username:this.loginname, password:this.loginpassword },{ withCredentials:false });// withCredentials:false 禁用跨域请求
      if (res.data.code) {
      this.checkLoginStatus(res.data.code,res.data.message,res.data.token);
      return res.data
    }},
    checkLoginStatus(code: number,message: string,token: string): void {
      if (code) {
        this.code = code;
        this.loginmessage = message;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigateTo('/home')
      }else{
        this.code = code;
        this.loginmessage = message;
        alert(message)
      }
    },
    SetCookies(username: string, password: string,name: string): string {
      const Cookies = useCookie(name,{
        maxAge: 3600,
        readonly:false,
        encode:(value)=>JSON.stringify(value),
        sameSite:'strict',
      });
      Cookies.value = `${username}&${password}`
      return Cookies.value
    },
    async register(): Promise<Object> {
      const res = await axios.post('http://localhost:3600/register', { username:this.registername, password:this.registerpassword, email:this.registeremail },{ withCredentials:true });
      if (res.data.code) {
        this.tologin()
      }
      return res.data
    },
    tologin(){
      alert('注册成功，请登录')
      this.$reset
    }
  }
})


