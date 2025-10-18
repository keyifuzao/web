import {UtilsCookieTools} from "@/utils/utilsAccount";


export default defineNuxtRouteMiddleware((to,from)=>{
    const CookieTools = new UtilsCookieTools();
    const CookiesChecked = CookieTools.userName.value? true : false;
    if(to.path !== '/login' && to.path !== '/error' &&!CookiesChecked){
        return navigateTo('/login')
    }else if(to.path === '/login' && CookiesChecked){
        return navigateTo('/home')
    }
})