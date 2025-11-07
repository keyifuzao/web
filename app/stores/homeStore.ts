import { defineStore } from 'pinia'

export const useHomeStore = defineStore('home', {
    state: () => ({
        widgetsTimer: {
            timeLeft: 0 as number,
            timer: null as number | null,
            touchedtoggle: false as boolean,
            starttoggle: false as boolean,
        },
        widgetsClock: {
            Days: '' as string,
            Hours: '' as string,
        },
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
    },
    actions: {
        setDays(date: string = '2025-08-29') {
            const startdate = new Date(date);
            const enddate = new Date();
            const diffTime = Math.abs(enddate.getTime() - startdate.getTime());
            this.widgetsClock.Days = Math.floor(diffTime / (1000 * 60 * 60 * 24)).toString();
            this.widgetsClock.Hours = Math.floor(diffTime / (1000 * 60 * 60)).toString();
        },
    }
})