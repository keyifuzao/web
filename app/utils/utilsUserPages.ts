import { UtilsLoginOrRegister, UtilsWebRequests } from './utilsWebTools'
import { cookiesTools } from '#imports';
import { useAccountStore } from '#imports';
import { useAlertStore } from '#imports';
class LoginPage {
    loginOrRegister;alertStore;accountStore;
    constructor() {
        this.accountStore = useAccountStore()
        this.alertStore = useAlertStore()
        this.loginOrRegister = new UtilsLoginOrRegister()
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
            this.alertStore.showAlert(checkLoginInfo.message, 'tip')
            return
        }
        try {const { data: { data } } = await this.loginOrRegister.login(username.trim(), password.trim())
            if (data) {
                this.accountStore.setTokenData(data)
                return navigateTo('/home')
            }
        } catch (error: any) {
            this.alertStore.showAlert(error.response.data.message, 'error')
            return null
        }

    }
    async __register(username: string, email: string, password: string, confirmPassword: string) {
        const checkRegisterInfo = this.checkRegisterInfo(username, email, password, confirmPassword)
        if (checkRegisterInfo.code === 0) {
            this.alertStore.showAlert(checkRegisterInfo.message, 'tip')
            return
        }
        try{const { data: { code, message } } = await this.loginOrRegister.register(username.trim(), password.trim(), email.trim())
            code === 1 ? this.alertStore.showAlert('注册成功') : this.alertStore.showAlert(message, 'error')
        } catch (error: any) {
            this.alertStore.showAlert(error.response.data.message, 'error')
        }
    }
}
class UserCenterPage {
    accountStore;cookiesTools;webRequests;alertStore;token
    constructor() {
        this.accountStore = useAccountStore()
        this.alertStore = useAlertStore()
        this.cookiesTools = new cookiesTools()
        this.token = this.__getToken()
        this.webRequests = new UtilsWebRequests(this.token)
    }

    __getToken(){
        const tokenRes = this.cookiesTools.getCookie('token', 'fuzao_secret_key')
        const tokenInfo = tokenRes? tokenRes.token : null
        return this.accountStore.token? this.accountStore.token : tokenInfo
    }

    __saveCookiesUserInfo(userInfo: { uuid: number, username: string, email: string, birthday: string, tel: number, gender: number, city: string, role: number, signature: string, update_time: string, create_time: string }) {
        this.cookiesTools.setCookie('userInfo', userInfo, 1, 'fuzao_secret_key')
    }
    __getCookiesUserInfo() {
        const res = this.cookiesTools.getCookie('userInfo', 'fuzao_secret_key')
        if (res) return res as { uuid: number, username: string, email: string, birthday: string, tel: number, gender: number, city: string, role: number, signature: string, update_time: string, create_time: string }
        return null
    }
    async __getUserInfo() {
        try {const { data: { data } } = await this.webRequests.getUser()
            return data as { uuid: number, username: string, email: string, birthday: string, tel: number, gender: number, city: string, role: number, signature: string, update_time: string, create_time: string }
        }catch (error: any) {
            this.alertStore.showAlert(error.response.data.message, 'error')
            return null
        }
    }
    async __patchUserInfo(dbs: { uuid: number, username: string, email: string, birthday: string, tel: number, gender: number, city: string ,signature: string }) {
        try {const res:{data:{code: number, message: string}} = await this.webRequests.patchUser(dbs)
            this.alertStore.showAlert(res.data.message)
            this.cookiesTools.clearCookie('userInfo')
            this.cookiesTools.setCookie('token', { uuid: dbs.uuid, username: dbs.username, token: this.token }, 1, 'fuzao_secret_key')
            return res.data
        } catch (error: any) {
            this.alertStore.showAlert(error.response.data.message, 'error')
            return null
        }
    }
    async __previewUserInfo(){
        const userCookiesInfo = this.__getCookiesUserInfo()
        if (!userCookiesInfo) {
            const userWebInfo = await this.__getUserInfo()
            if (!userWebInfo) return null
            this.__saveCookiesUserInfo(userWebInfo)
            return userWebInfo
        }
        return userCookiesInfo
    }
    __birthToAge = (birthDay: string): number => {
        const birthDate = new Date(birthDay)
        const nowDate = new Date()
        const diffTime = Math.abs(nowDate.getTime() - birthDate.getTime())
        const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        return age
    }
}
export { LoginPage, UserCenterPage }