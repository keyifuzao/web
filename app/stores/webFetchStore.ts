import { defineStore } from "pinia";

export const useWebFetchStore = defineStore('webFetch', {
    state: () => ({
        //主页新闻
        homePageNews:null as Object[] | null,
        source: 'baidu' as string,
        //主页天气
        homePageWeather: null as Object | null,
        updateTime: '' as string,
        location: '101180109' as string,
        key: '301485d5a35d49a6b42b644122575025' as string,
        region: null as Array<Object> | null,
    }),
    actions: {
        async fetchHomePageNews() {
            const {data, msg ,status} = await $fetch('https://orz.ai/api/v1/dailynews', {
                method: 'GET',
                params:{
                    platform: `${this.source}`
                },
                lazy: true
            }) as {data: Object[],msg: string,status: number}
            this.homePageNews = data.slice(0,6)
        },
        async fetchHomePageWeather() {
            const { code , updateTime , now} = await $fetch('https://kc359dpk2e.re.qweatherapi.com/v7/weather/now', {
                method: 'GET',
                params: {
                    location: this.location,
                    key: this.key
                },
                lazy: true
            }) as {code: number, updateTime: string, now: Object}
            this.homePageWeather = now
            this.updateTime = updateTime
        },
        async getCityInfo(city: string) {
            const { location} = await $fetch('https://kc359dpk2e.re.qweatherapi.com/geo/v2/city/lookup', {
                method: 'GET',
                params:{
                    location: city,
                    key: this.key
                },
                lazy: true
            }) as {location: Array<Object>}
            this.region = location
        }
    }
});