// 这个组件是/login页面的负责登录和注册的功能。
import { encode } from "punycode";
import { useLoginStore } from "../stores/loginStore";

class UtilsLoginRegister {
    loginStore = useLoginStore();
    registerMsg = ref('')
    loginName = ref('');
    registerName = ref('');
    registerEmail = ref('');
    registerPassword = ref('');
    loginPassword = ref('');
    ConfirmPasswordInput = ref('');
    togglebox = ref(false);
    constructor(){

    }
    //向状态管理器同步数据
    asyncStoreData():void{
            this.loginStore.$patch({
            loginname: this.loginName.value as string ,
            loginpassword: this.loginPassword.value as string ,
            registername: this.registerName.value as string ,
            registerpassword: this.registerPassword.value as string ,
            registeremail: this.registerEmail.value as string ,
        })
    }
    //登录
    login():void{
        this.asyncStoreData();
        this.loginStore.userLogin()
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
    //注册
    register() :void{
        this.asyncStoreData();
        this.loginStore.register()
        this.togglebox.value = false;
    }
    //设置cookie
}

export default UtilsLoginRegister