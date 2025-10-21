import Cookies from "js-cookie";


export default defineNuxtRouteMiddleware((to,from)=>{
    const CookiesChecked = Cookies.get('token')? true : false
    if(to.path !== '/login' && to.path !== '/error' &&!CookiesChecked){
        return navigateTo('/login')
    }else if(to.path === '/login' && CookiesChecked){
        return navigateTo('/home')
    }
})