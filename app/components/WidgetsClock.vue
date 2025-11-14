<!-- 这个是home页面时钟的组件 -->
 <template>
    <div class="clock">
        <h2>时钟clock</h2>
        <span>{{clock}}</span><br/>
        <p>{{week}}</p>
        <p>{{year}}年{{month}}月{{day}}日</p>
    </div>
 </template>
 <script setup lang="ts">
 import { useTimerStore } from '#imports';
    const timerStore = useTimerStore();
    const clock = ref('00:00:00');
    const week = ref('星期一');
    const year = ref('2025');
    const month = ref('10');
    const day = ref('01');
    watch(timerStore.$state, (newVal) => {
        clock.value = newVal.clock;
        week.value = newVal.week;
        year.value = newVal.year;
        month.value = newVal.month;
        day.value = newVal.day;
    })

    onMounted(() => {
        timerStore.getClockTimer;
    })
</script>
 <style scoped lang="scss">
    $fontSize: 0.12rem;
    .clock {
        padding: $fontSize*0.8;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-family: 'Times New Roman', Times, serif;
        box-sizing: border-box;
        h2 {
            padding: 0;
            margin: 0;
            font-size: $fontSize*0.8;
            color: rgb(100, 100, 100);
        }
        span {
            margin: $fontSize*1.6 0 $fontSize*0.8 0;
            font-size: $fontSize*2.4;
            font-weight: bolder;
        }
        p {
            margin: $fontSize*0.3 0;
            font-size: $fontSize*0.8;
            color: rgb(100, 100, 100);
        }
    }
</style>