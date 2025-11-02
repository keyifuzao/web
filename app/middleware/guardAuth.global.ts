import { TokenTools } from "../utils/utilsTokenTools"
export default defineNuxtRouteMiddleware((to, from) => {
    // const loginChecked = async () => {
    //     const tokenTools = new TokenTools()
    //     const tokenRes = tokenTools.getCookie("token","fuzao_secret_key") as { uuid: number, username: string, token: string }
    //     if (tokenRes) {
    //         const { token } = tokenRes
    //         const res: {data: {value: {code: number, message: string} | null}} = await useFetch('http://localhost:3600/login/check',{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         }})
    //         const code = res.data.value?.code || 0
    //         return code? true : false
    //     }else{
    //         return false
    //     }
    // }
    // const authChecked = async () => {
    //     const authRes = await loginChecked()
    //     console.log('authRes',authRes)
    //     if (!authRes && to.path !== '/login' ) {
    //         navigateTo ('/login')
    //     }else if (authRes && to.path === '/login' ){
    //         navigateTo ('/home')
    //     }
    // }
    // authChecked()
    // if (!CookiesChecked() && to.path !== '/login' ) {
    //     //无权限、去任意页面、且不刷新页面，返回登录页面
    //     router.push('/login')
    // } else if (CookiesChecked() && to.path === '/login' ){
    //     //有权限、去任意页面、且不刷新页面，返回首页
    //     router.push('/home')
    // }
})

