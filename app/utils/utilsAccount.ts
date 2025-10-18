// 这个组件是/login页面的负责登录和注册的功能。
import { useAccountStatusStore } from "../stores/accountStatusStore";
import CryptoJS from 'crypto-js'
import axios from "axios";

class UtilsAccountInit {
  accountStatusStore = useAccountStatusStore();
  constructor(){
    this.accountStatusStore.$subscribe(this.handleStoreChange);
  }
  handleStoreChange(state: any) {
    console.log('accountStatusStore state change:', state);
  }
}

class UtilsLoginRegister {
    accountStatusStore = useAccountStatusStore();
    registerMsg = ref('')
    loginName = ref('');
    registerName = ref('');
    registerEmail = ref('');
    registerPassword = ref('');
    loginPassword = ref('');
    ConfirmPasswordInput = ref('');
    togglebox = ref(false);
    tipMessage = ref('');
    CookieTools = new UtilsCookieTools()
    constructor(){

    }
    initData(){
      this.registerName.value = this.registerPassword.value = this.ConfirmPasswordInput.value = this.registerEmail.value = '';
    }
    
    async Login() {
      await axios.post('http://localhost:3600/login', { username:this.loginName.value, password:this.loginPassword.value },{ withCredentials:false }).then(res => {
        if (res.status === 200 ) {
          this.checkLoginStatus(res.data.code,res.data.message,res.data.token);
        }
      }).catch(err => {
        alert(err.response.data.message)
      })
    };// withCredentials:false 禁用跨域请求

    checkLoginStatus(code: number,message: string,token: string) {
      if (code) {
        this.tipMessage.value = message;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.CookieTools.SetCookies(this.loginName.value, 'fuzao_secret');
        return navigateTo('/home')
      }else{
        this.tipMessage.value = message;
        alert(message)
      }
    }

    //模态框开关
    toggleModel (): void {
        this.togglebox.value = !this.togglebox.value
    }
    //核查名称
    checkName(name: string) : boolean {
        if(name === '' ){
            this.registerMsg.value = "提示:用户名不能为空";
            return false;
        }else if(!/^[a-zA-Z0-9]{6,12}$/ .test(name) ){
            this.registerMsg.value = "提示:用户名长度必须在6-12位之间";
            return false;
        }
        else{
            return true
        }
    }
    //核查邮箱
    checkEmail(email: string) : boolean {
        if(email === '' ){
            this.registerMsg.value = "提示:邮箱不能为空";
            return false;
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            this.registerMsg.value = "提示:请输入正确的邮箱格式";
            return false;
        }else{
            return true
        }
    }
    //核查密码
    checkPassword(password: string) : boolean {
        if(password === '' ){
            this.registerMsg.value = "提示:密码不能为空";
            return false;
        }else if(!/^[a-zA-Z0-9]{6,15}$/.test(password)){
            this.registerMsg.value = "提示:密码长度必须在6-15位之间";
            return false;
        }else{
            return true
        }
    }
    //核查确认密码
    checkConfirmPassword(confirmPassword: string) : boolean {
        if(confirmPassword === '' ){
            this.registerMsg.value = "提示:确认密码不能为空";
            return false;
        }else if(confirmPassword !== this.registerPassword.value){
            this.registerMsg.value = "提示:两次输入的密码不一致";
            return false;
        }else{
            return true
        }
    }
    //检查数据正确与否按钮
    isDisabled() :boolean{
        if (this.checkName(this.registerName.value) && this.checkEmail(this.registerEmail.value) && this.checkPassword(this.registerPassword.value) && this.checkConfirmPassword(this.ConfirmPasswordInput.value)){
            return false;
        }else{
            return true;
        }
    }
    async register() :Promise<void> {
      await axios.post('http://localhost:3600/register', { username:this.registerName.value, password:this.registerPassword.value, email:this.registerEmail.value },{ withCredentials:true }).then(res => {
        if (res.status === 200 ) {
          alert(res.data.message)
          this.togglebox.value = false;
          this.initData()
        }
      }).catch(err => {
        alert(err.response.data.message)
      })
    }
}

class UtilsCookieTools {
    userName:Ref<string|null> = ref('');
    cookies:Ref<string> | null = useCookie('userInfo',{
        path: '/',
        sameSite: 'lax',
        maxAge: 3600,
        encode: (value) => JSON.stringify(value),
        decode: (value) => JSON.parse(value || '{}'),
    });
    constructor(){
      this.userName = ref(this.GetCookies('userInfo', 'fuzao_secret') || null)
    };

    //以下是账户及cookie状态管理
    SetCookies(username: string, secretKey: string): void {
      const data = this.CryptoInfo(username, secretKey);
      this.cookies!.value = data as string ;

    }
    CryptoInfo(data: string, secretKey: string): string {
      return CryptoJS.AES.encrypt(data, secretKey).toString()
    }
    GetCookies(CookieName: string, secretKey: string): string | null {
      const data = this.cookies!.value;
      if (data) {
        const bytes = CryptoJS.AES.decrypt(data, secretKey)
        const originalText = bytes.toString(CryptoJS.enc.Utf8)
        return originalText
      }
      return null
    }
    ClearCookies(CookieName: string): void {
      this.cookies = null;
    }
}



export { UtilsLoginRegister, UtilsCookieTools }