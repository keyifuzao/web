import { defineStore } from 'pinia'

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
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