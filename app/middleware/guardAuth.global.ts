export default defineNuxtRouteMiddleware((to, from) => {
    const accountStore = useAccountStore()
    const CookiesChecked = () => accountStore.getCookie("token","fuzao_secret_key") ? true : false
    const router = useRouter()
    if (!CookiesChecked() && to.path !== '/login' ) {
        //无权限、去任意页面、且不刷新页面，返回登录页面
        router.push('/login')
    } else if (CookiesChecked() && to.path === '/login' ){
        //有权限、去任意页面、且不刷新页面，返回首页
        router.push('/home')
    }
})

