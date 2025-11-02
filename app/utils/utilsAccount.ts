import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js'
import axios from "axios";
import { useAccountStore } from '../stores/accountStore';

class UtilsWebRequests {
  accountStore = useAccountStore();
  loginRegister = new UtilsLoginRegister();
  togglebox = ref<boolean>();

  AxiosService = axios.create({
    baseURL: 'http://localhost:3600',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  constructor() {
    this.togglebox.value = false;
  }
  //登录请求
  Login(username: string, password: string) {
    this.AxiosService.post('/login', { username, password }).then(res => {
      this.loginRegister.checkLoginStatus(res.data.code, res.data.message, username, res.data.uuid, res.data.token);
    }).catch(err => {
      alert(err.response.data.message)
    })
  };
  //注册请求
  register(username: string, password: string, email: string){
    this.AxiosService.post('/register', { username, password, email }).then(res => {
      if (res.status === 200) {
        alert(res.data.message)
        this.togglebox.value = false;
      }
    }).catch(err => {
      alert(err.response.data.message)
    })
  }
  //获得用户信息:userName是数据库中的用户名
  async getUsrInfo(uuid: number,usertoken:string): Promise<void> {
    const res = await this.AxiosService.post('/api/userInfo', { uuid },{
      headers: {'Authorization': `Bearer ${usertoken}`}
    })
    const { code, message, data } = res.data;
    this.accountStore.$patch({ userInfoData: data })
    this.accountStore.setCookie("userInfo", data, 1, "fuzao_secret_key")
  }
  //更新用户信息
  async updateUsrInfo(uuid: number,username: string,usertoken:string,email:string,birthday:string,tel:number,gender:number,city:string,role:number,signature:string, create_time:Date): Promise<void> {
    this.accountStore.$patch({ userInfoData: { uuid,username,email,birthday,tel,gender,city,role,signature, create_time } })
    const res =await this.AxiosService.post('/api/updateUserInfo', {uuid, username,email,birthday,tel,gender,city,role,signature, create_time},{
      headers: {'Authorization': `Bearer ${usertoken}`}
    })
    console.log(res.data)
    const { code, message} = res.data;
    alert(message)
  }
    
}

class UtilsLoginRegister {
  registerMsg = ref<string>()
  togglebox = ref<boolean>();
  tipMessage = ref<string>();
  accountStore = useAccountStore();
  // CookieTools = new UtilsCookieTools()
  constructor() {
    this.togglebox.value = false;
  }
  checkLoginStatus(code: number, message: string, username: string,uuid: number, token: string) {
    if (code) {
      this.tipMessage.value = message;
      this.accountStore.$patch({ data: { username,uuid, token } })
      this.accountStore.setCookie("token", { username,uuid, token }, 1, "fuzao_secret_key")
      // this.CookieTools.setCookie(cookieName, { username, token }, hour, secretKey)
      return navigateTo('/home')
    } else {
      this.tipMessage.value = message;
      alert(message)
    }
  }

  //模态框开关
  toggleModel(): void {
    this.togglebox.value = !this.togglebox.value
  }
  //核查名称
  checkName(name: string): boolean {
    if (name === '') {
      this.registerMsg.value = "提示:用户名不能为空";
      return false;
    } else if (!/^[a-zA-Z0-9]{6,12}$/.test(name)) {
      this.registerMsg.value = "提示:用户名长度必须在6-12位之间";
      return false;
    }
    else {
      return true
    }
  }
  //核查邮箱
  checkEmail(email: string): boolean {
    if (email === '') {
      this.registerMsg.value = "提示:邮箱不能为空";
      return false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.registerMsg.value = "提示:请输入正确的邮箱格式";
      return false;
    } else {
      return true
    }
  }
  //核查密码
  checkPassword(password: string): boolean {
    if (password === '') {
      this.registerMsg.value = "提示:密码不能为空";
      return false;
    } else if (!/^[a-zA-Z0-9]{6,15}$/.test(password)) {
      this.registerMsg.value = "提示:密码长度必须在6-15位之间";
      return false;
    } else {
      return true
    }
  }
  //核查确认密码
  checkConfirmPassword(confirmPassword: string, registerPassword: string): boolean {
    if (confirmPassword === '') {
      this.registerMsg.value = "提示:确认密码不能为空";
      return false;
    } else if (confirmPassword !== registerPassword) {
      this.registerMsg.value = "提示:两次输入的密码不一致";
      return false;
    } else {
      return true
    }
  }
  //检查数据正确与否按钮
  isDisabled(registerName: string, registerEmail: string, registerPassword: string, ConfirmPasswordInput: string): boolean {
    if (this.checkName(registerName) && this.checkEmail(registerEmail) && this.checkPassword(registerPassword) && this.checkConfirmPassword(ConfirmPasswordInput, registerPassword)) {
      return false;
    } else {
      return true;
    }
  }
}

class UtilsCookieTools {
  constructor() {
  };
  //设置cookie
  //cookieName：cookie名称，cookieData：cookie数据，exp：过期时间，单位为小时，secretKey：加密密钥
  setCookie(cookieName: string, data:{username:string,token:string}, exp: number,secretKey:string){
    const expDate = new Date();
    expDate.setTime(expDate.getTime() + exp  * 60 * 60 * 1000);  
    const cookieCryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    Cookies.set (cookieName, cookieCryptedData ,{ expires: expDate })
  }
  //获取cookie
  //cookieName：cookie名称，secretKey：加密密钥
  getCookie(cookieName: string, secretKey: string):{username:string,token:string} | null {
    const cookieData = Cookies.get(cookieName)
    if (cookieData) {
      const bytes = CryptoJS.AES.decrypt(cookieData, secretKey)
      const originalText = bytes.toString(CryptoJS.enc.Utf8)
      return JSON.parse(originalText)
    } else {
      return null
    }
  }
  //清除cookie
  clearCookie(cookieName: string): void {
    Cookies.remove(cookieName)
  }
}
export { UtilsWebRequests, UtilsLoginRegister, UtilsCookieTools }