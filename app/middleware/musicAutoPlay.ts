import { useMusicStore } from '~/stores/musicStore';
import { useRouterInfoStore }  from '~/stores/initwebsettingStore';

export default defineNuxtRouteMiddleware((to,from) => {
    const musicPlayer = useMusicStore();
    const { headerTitleInfo } = useRouterInfoStore();


    const getPaths = (path: string) => {
        headerTitleInfo.forEach((item) => {
            if (item.path === to.path) {

            }
        })
    }

})