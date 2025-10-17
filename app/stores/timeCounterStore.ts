import {defineStore} from "pinia";

export const useTimeCounterStore = defineStore('timeCounter', {
    state: () => ({
        //以下为倒计时相关变量
        timeLeft : 0 as number,
        timer: null as number | null,
        touchedtoggle: false as boolean,
        starttoggle: false as boolean,
        //以下为纪念日相关变量
        titleShow:'我们已经结婚' as string,
        dateShow:'2025-08-29' as string,
        Days:'' as string,
        Hours:'' as string,

    }),
    getters: {
        //以下为倒计时相关getters
        startCounter() {
            if (this.timeLeft > 0) {
                const timer = setInterval(() => {
                    this.timeLeft -= 1;
                    if (this.timeLeft <= 0) {
                        clearInterval(timer);
                    }
                }, 1000)
                this.timer = timer as unknown as number;
            }
        },
        stopCounter() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
                this.timeLeft = 30;
                this.starttoggle = false;
            }
        },
        //以下为纪念日相关getters
        setDays(){
            const startdate = new Date(this.dateShow);
            const enddate = new Date();
            const diffTime = Math.abs(enddate.getTime() - startdate.getTime());
            this.Days = Math.floor(diffTime / (1000 * 60 * 60 * 24)).toString();
            this.Hours = Math.floor(diffTime / (1000 * 60 * 60)).toString();
        }
    },
    actions: {

    }
})