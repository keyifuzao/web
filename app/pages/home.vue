<template>
    <Header></Header>
    <main class="home_box">
        <WidgetsDisplayPic></WidgetsDisplayPic>
        <div class="middle_box">
            <WidgetsClock :class="{active: numCounter%12===1}" :style="changeStyle"></WidgetsClock>
            <WidgetsWeather :class="{active: numCounter%12===3}" :style="changeStyle"></WidgetsWeather>
            <WidgetsDays :class="{active: numCounter%12===5}" :style="changeStyle"></WidgetsDays>
        </div>
        <div class="rightBox">
            <div class="rightBoxTop">
                <WidgetsTxtBar></WidgetsTxtBar>
                <WidgetsWebTool></WidgetsWebTool>
            </div>
            <WidgetsMusic></WidgetsMusic>
        </div>
    </main>
    <Footer></Footer>
</template>
<script setup lang="ts">
    import { useTimerStore } from '#imports';
import WidgetsWeather from '~/components/WidgetsWeather.vue';
    const timerStore = useTimerStore()
    const numCounter = ref<number>(12)
    const color = ref<string>('')
    const changeStyle = computed(() => {
        return { '--backgroundColorHover': color.value,
            '--transformHover': 'scale(1.1)'}})
    watch(timerStore.$state, (newVal) => {
        numCounter.value = newVal.homeMidtime
        color.value = newVal.color
    })
</script>

<style scoped>
    .home_box {
        display: flex;
        width: 1800px;
        height: 800px;
        margin: 20px auto;
    }
    .home_box .middle_box {
        width: 300px;
        height: 100%;

    }
    .home_box .middle_box div{
        width: 300px;
        height: 253px;
        background-color: rgb(235, 235, 235);
        margin-top: 10px;
        border-radius: 20px;
        transition: all 1s;
    }
    .home_box .middle_box div:hover{
        background-color: rgba(255, 135, 0,0.5);
        transform: scale(1.1);
        transition: all 1s ;
      
    }
    .home_box .middle_box div.active{
        background-color: var(--backgroundColorHover);
        transform: var(--transformHover);
        transition: all 1s;
    }

    .home_box .rightBox {
        width: 750px;
        height: 100%;
        margin-left: 30px;
    }

    .rightBoxTop {
        display: flex;
    }

</style>