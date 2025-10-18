import { defineStore } from 'pinia'

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
        headerTitleInfo: [
            {
                name: '首页',
                path: '/home'
            },
            {
                name: '媒体',
                path: '/media'
            },
            {
                name: '文章',
                path: '/article'
            },
            {
                name: '关于我',
                path: '/about'
            },
        ],
        userAccountInfo: {
            uuid: '' as string,
            user: '' as string,
            sex: 0 as number,
            age: 0 as number,
            birth: '' as string,
            address: '' as string,
            intro: '' as string,
            avatar: '' as string,
            background: '' as string,
            create_time: '' as string,
            update_time: '' as string,
            login_time: '' as string,
            login_ip: '' as string,
            login_count: 0 as number,
            status: 0 as number,
            last_login_time: '' as string,
            last_login_ip: '' as string,
            last_login_count: 0 as number,
            login_error_count: 0 as number,
            login_error_time: '' as string,
            login_error_ip: '' as string,
            login_error_reason: '' as string,
            login_error_count_max: 0 as number,
            password: '' as string,
            tel: '' as string,
            email: '' as string,
            role: 0 as number,
            city: '' as string,

        },
        widgetsTimer: {
            timeLeft: 0 as number,
            timer: null as number | null,
            touchedtoggle: false as boolean,
            starttoggle: false as boolean,
        },
        widgetsClock: {
            titleShow: '我们已经结婚' as string,
            dateShow: '2025-08-29' as string,
            Days: '' as string,
            Hours: '' as string,
        },
        autoStylePlay:{
            timerCount: 0 as number,
        }
    }),
    getters: {
        //widgetsTimer相关getters
        startCounter() {
            if (this.widgetsTimer.timeLeft > 0) {
                const timer = setInterval(() => {
                    this.widgetsTimer.timeLeft -= 1;
                    if (this.widgetsTimer.timeLeft <= 0) {
                        clearInterval(timer);
                    }
                }, 1000)
                this.widgetsTimer.timer = timer as unknown as number;
            }
        },
        stopCounter() {
            if (this.widgetsTimer.timer) {
                clearInterval(this.widgetsTimer.timer);
                this.widgetsTimer.timer = null;
                this.widgetsTimer.timeLeft = 30;
                this.widgetsTimer.starttoggle = false;
            }
        },
        //widgetsClock相关getters
        setDays() {
            const startdate = new Date(this.widgetsClock.dateShow);
            const enddate = new Date();
            const diffTime = Math.abs(enddate.getTime() - startdate.getTime());
            this.widgetsClock.Days = Math.floor(diffTime / (1000 * 60 * 60 * 24)).toString();
            this.widgetsClock.Hours = Math.floor(diffTime / (1000 * 60 * 60)).toString();
        },
        //home页面图片轮播，卡片自动播放相关getters

        AutoPlayCompute(){
            setInterval(() => {
                this.autoStylePlay.timerCount += 1;
                if(this.autoStylePlay.timerCount >= 36){
                    this.autoStylePlay.timerCount = 0;
                }
            }, 3000)
        }
    },
    actions: {

    }
})