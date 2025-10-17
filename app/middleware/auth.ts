import { useLoginStore } from '~/stores/loginStore';

export default defineNuxtRouteMiddleware((to) => {
    const loginStore = useLoginStore();

    if (loginStore.$state.code && to.path === '/login' ) {
        return navigateTo('/home')
    }else if (!loginStore.$state.code && to.path !== '/login') {
        return navigateTo('/login')
    }
})