<!-- 这个是home页面倒计时的组件 -->
<template>
    <div >
        <h2>计时器</h2>
        <span @click.self="touchedtoggle = !touchedtoggle"><b>剩余</b>{{ timeleft }}<b>秒</b></span>
        <div class="time_input" v-show="touchedtoggle" >
            <select id="secondConter" v-model.number="timeleft" :disabled=" starttoggle">
                <option value="15" selected>15s</option>
                <option value="30">30s</option>
                <option value="45">45s</option>
                <option value="60">60s</option>
            </select>
            <button :disabled=" starttoggle " :style="{'background-color': starttoggle ? 'rgb(180, 180, 180)' : 'rgb(255, 135, 0)'} " @click="timeCounter.start()">计时</button>
            <button  @click="timeCounter.stop()">停止</button>
        </div>
    </div>
</template>
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
        font-size: 120px;
        font-weight: bold;
        color: rgb(50, 50, 50);
        text-align: center;
        cursor: pointer;
    }
    div span b {
        font-size: 18px;
        font-weight: bold;
    }

    div .time_input {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    div .time_input select {
        width: 60px;
        height: 25px;
        border-radius: 10px;
        border: none;
        text-align: center;
        font-size: 18px;
        font-weight: lighter;
        margin-right: 10px;
    }
    div .time_input button {
        width: 60px;
        height: 25px;
        margin-right: 10px;
        border-radius: 10px;
        border: none;
        background-color: rgb(255, 135, 0);
        color: white;
        font-size: 16px;
        font-weight: lighter;
        cursor: pointer;
    }
</style>
<script setup lang="ts">
    import TimeCounter from '~/utils/utilsHomePage'; 

    const timeCounter = new TimeCounter.TimeCounter()
    const touchedtoggle = timeCounter.touchedToggle;
    const starttoggle = timeCounter.startToggle;
    const timeleft = timeCounter.timeLeft;
    
    onMounted(() => {
        timeCounter.timeLeft.value = timeCounter.homeStore.$state.widgetsTimer.timeLeft;
        timeCounter.startToggle.value = timeCounter.homeStore.$state.widgetsTimer.starttoggle;
        timeCounter.touchedToggle.value = timeCounter.homeStore.$state.widgetsTimer.touchedtoggle;
    })

    watch(timeleft, () => {
        if (timeleft.value === 0) {
            timeCounter.stop();
            timeleft.value = 30;
        }
    })
    watch(timeCounter.homeStore.$state.widgetsTimer, (state) => {
        timeCounter.timeLeft.value = state.timeLeft;
    })
</script>