import { useAccountStore } from "#imports"
import { cookiesTools } from "#imports"
export default defineNuxtRouteMiddleware((to, from) => {
    const accountStore = useAccountStore()
    const cookies = new cookiesTools()
    const tokenRes = accountStore.token? true : cookies.getCookie('token', 'fuzao_secret_key')?true:false
    const router = useRouter()
    if (!tokenRes && to.path !== '/login' ) {
        router.replace('/login')
    }else if (tokenRes && to.path === '/login'){
        router.replace('/home')
    }
})

