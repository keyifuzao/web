////此页面为/home路径下，组件名为WidgetsTimeCounter.vue中的倒计时套件以及WidgetDays.vue中的纪念日套件的实现
import { useTimeCounterStore } from "~/stores/timeCounterStore"

class TimeCounter {
    timeCounterStore = useTimeCounterStore()
    //以下为倒计时参数
    touchedToggle = ref<boolean>(false)
    startToggle = ref<boolean>(false)
    timeLeft = ref<number>(30)
    //以下为纪念日参数
    Days = ref<string>("")
    Hours = ref<string>("")
    titleShow = ref<string>("我们已经结婚")
    dateShow = ref<string>("2025-08-29")
    toggleShow = ref<boolean>(false)
    constructor() {
    }
    //以下为倒计时方法
    start() {
        this.timeCounterStore.timeLeft = this.timeLeft.value
        this.timeCounterStore.startCounter
        this.timeCounterStore.starttoggle=this.startToggle.value = true
        this.timeCounterStore.touchedtoggle=this.touchedToggle.value = false
    }
    stop() {
        this.timeCounterStore.stopCounter
        this.startToggle.value = false
    }
    //以下为纪念日方法
    saveDate(){
        this.timeCounterStore.titleShow=this.titleShow.value
        this.timeCounterStore.dateShow=this.dateShow.value
        this.timeCounterStore.setDays
        setTimeout(() => {
            this.Days.value=this.timeCounterStore.Days
            this.Hours.value=this.timeCounterStore.Hours
            this.toggleShow.value = false
        }, 1000)
    }

    initDays(){
        this.timeCounterStore.setDays
        this.Days.value = this.timeCounterStore.Days
        this.Hours.value = this.timeCounterStore.Hours
    }
}

export default TimeCounter