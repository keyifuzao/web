import { UtilsLoginOrRegister, UtilsWebRequests } from './utilsWebTools'
import { TokenTools } from './utilsTokenTools';
class LoginPage {
    loginOrRegister; tokenTools;
    constructor() {
        this.loginOrRegister = new UtilsLoginOrRegister()
        this.tokenTools = new TokenTools()
    }
    checkLoginInfo(loginName: string, loginPassword: string) {
        if (loginName.trim() === '' || loginPassword.trim() === '') {
            return { code: 0, message: '请输入用户名或密码' }
        } else if (!/^[a-zA-Z0-9]{3,10}$/.test(loginName.trim())) {
            return { code: 0, message: '用户名只能包含字母、数字,长度3-10位' }
        } else if (!/^[a-zA-Z0-9]{6,10}$/.test(loginPassword.trim())) {
            return { code: 0, message: '密码只能包含字母、数字,长度6-10位' }
        } else {
            return { code: 1, message: '核对信息成功' }
        }
    }
    checkRegisterInfo(registerName: string, registerEmail: string, registerPassword: string, registerConfirmPassword: string) {
        if (registerName.trim() === '' || registerEmail.trim() === '' || registerPassword.trim() === '' || registerConfirmPassword.trim() === '') {
            return { code: 0, message: '请填写完整信息' }
        } else if (!/^[a-zA-Z0-9]{3,10}$/.test(registerName.trim())) {
            return { code: 0, message: '用户名只能包含字母、数字,长度3-10位' }
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(registerEmail.trim())) {
            return { code: 0, message: '邮箱格式不正确' }
        } else if (!/^[a-zA-Z0-9]{6,10}$/.test(registerPassword.trim())) {
            return { code: 0, message: '密码只能包含字母、数字,长度6-10位' }
        } else if (registerPassword.trim() !== registerConfirmPassword.trim()) {
            return { code: 0, message: '两次密码输入不一致' }
        } else {
            return { code: 1, message: '核对信息成功' }
        }
    }

    async __login(username: string, password: string) {
        const checkLoginInfo = this.checkLoginInfo(username, password)
        if (checkLoginInfo.code === 0) {
            this.__alertMessage(checkLoginInfo.message)
            return
        }
        try {const { data: { data } } = await this.loginOrRegister.login(username.trim(), password.trim())
            if (data) {
                this.tokenTools.setCookie('token', { uuid: data.uuid, username: data.username, token: data.token }, 1, 'fuzao_secret_key')
                return navigateTo('/home')
            }
        } catch (error: any) {
            this.__alertMessage(error.response.data.message)
        }

    }
    async __register(username: string, email: string, password: string, confirmPassword: string) {
        const checkRegisterInfo = this.checkRegisterInfo(username, email, password, confirmPassword)
        if (checkRegisterInfo.code === 0) {
            this.__alertMessage(checkRegisterInfo.message)
            return
        }
        try{const { data: { code, message } } = await this.loginOrRegister.register(username.trim(), password.trim(), email.trim())
            code === 1 ? this.__alertMessage('注册成功') : this.__alertMessage(message)
        } catch (error: any) {
            this.__alertMessage(error.response.data.message)
        }
    }

    __alertMessage(message: string) {
        let alertMessage = []
        alertMessage.push(message)
        return alertMessage
    }
}
class UserCenterPage {
    tokenTools;webRequests;tokenRes;
    constructor() {
        this.tokenTools = new TokenTools()
        this.tokenRes = this.__getToken()
        this.webRequests = new UtilsWebRequests(this.tokenRes)
    }

    __getToken(){
        try {const { token } = this.tokenTools.getCookie('token', 'fuzao_secret_key') as { uuid: number, username: string, token: string };return token
        } catch (error: any) {return ''}}

    __saveLocalStorageUserInfo(userInfo: { uuid: number, username: string, email: string, birthday: string, tel: number, gender: number, city: string, role: number, signature: string, update_time: string, create_time: string }) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
    __getLocalStorageUserInfo() {
        const userInfo = localStorage.getItem('userInfo')
        if (userInfo) {
            return JSON.parse(userInfo)
        } else {
            return null
        }
    }
    async __getUserInfo() {
        try {const { data: { data } } = await this.webRequests.getUser()
            return data
        }catch (error: any) {
            this.__alertMessage(error.response.data.message)
        }
    }
    async __patchUserInfo(dbs: { uuid: number, username: string, email: string, birthday: string, tel: number, gender: number, city: string ,signature: string }) {
        try {const res:{data:{code: number, message: string}} = await this.webRequests.patchUser(dbs)
            this.__alertMessage(res.data.message)
            localStorage.removeItem('userInfo')
            this.tokenTools.setCookie('token', { uuid: dbs.uuid, username: dbs.username, token: this.tokenRes }, 1, 'fuzao_secret_key')
            return res.data
        } catch (error: any) {
            this.__alertMessage(error.response.data.message)
        }
    }
    async __previewUserInfo(){
        const userLocalInfo = this.__getLocalStorageUserInfo()
        if (!userLocalInfo) {
            const userWebInfo = await this.__getUserInfo()
            this.__saveLocalStorageUserInfo(userWebInfo)
            return userWebInfo
        }
        return userLocalInfo
    }
    __birthToAge = (birthDay: string): number => {
        console.log(birthDay)
        const birthDate = new Date(birthDay)
        const nowDate = new Date()
        const diffTime = Math.abs(nowDate.getTime() - birthDate.getTime())
        const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        return age
    }
    __alertMessage(message: string) {
        let alertMessage = []
        alertMessage.push(message)
        return alertMessage
    }
}
export { LoginPage, UserCenterPage }