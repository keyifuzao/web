<!-- 这个是home页面时钟的组件 -->
 <template>
    <div >
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
 <style scoped>
    div h2 {
        display: block;
        font-family: 'Times New Roman', Times, serif;
        margin: 0 auto;
        font-size: 16px;
        font-weight:lighter;
        text-align: center;
    }
    div span {
        display: block;
        margin: 20px auto;
        font-family: 'Times New Roman', Times, serif;
        font-size: 60px;
        font-weight: bold;
        color: rgb(50, 50, 50);
        text-align: center;
    }
    div p {
        display: block;
        margin: 0 auto;
        font-family: 'Times New Roman', Times, serif;
        font-size: 18px;
        font-weight: bold;
        color: rgb(50, 50, 50);
        text-align: center;
    }
</style>