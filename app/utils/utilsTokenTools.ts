import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'

class   TokenTools {
    constructor() { 

    }
    //设置cookie
    //cookieName：cookie名称，cookieData：cookie数据，exp：过期时间，单位为小时，secretKey：加密密钥
    setCookie(cookieName: string,data:object,exp:number,secretKey:string): void {
        const expDate = new Date();
        expDate.setTime(expDate.getTime() + exp  * 60 * 60 * 1000);  
        const cookieCryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
        Cookies.set (cookieName, cookieCryptedData ,{ expires: expDate })
    }
    //清除cookie
    clearCookie(cookieName: string): void {
        Cookies.remove(cookieName)
    }
    //获取cookie
    getCookie(cookieName: string,secretKey:string): object | null {
        const cookieData = Cookies.get(cookieName)
        if (cookieData) {
            const bytes = CryptoJS.AES.decrypt(cookieData, secretKey)
            const originalText = bytes.toString(CryptoJS.enc.Utf8)
            return JSON.parse(originalText)
        } else {
            return null
        }
    }
}

export { TokenTools }