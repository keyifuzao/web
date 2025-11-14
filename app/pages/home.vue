<template>
    <Header></Header>
    <main class="home_box">
        <div class="leftBox">
            <WidgetsDisplayPic></WidgetsDisplayPic>
        </div>
        <div class="middleBox">
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

<style scoped lang="scss">
$fontSize: 0.12rem; 
   .home_box {
        margin: 0 auto;
        display: flex;
        width: $fontSize*75;
        height: $fontSize*36;
        .leftBox {
            flex: 0 0 $fontSize*30;
            height: $fontSize*36;
        }
        .middleBox {
            margin: 0 $fontSize*0.5;
            flex: 0 0 $fontSize*12;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: $fontSize*36;
            div {
                width: $fontSize*11.7;
                height: $fontSize*11.7;
                background-color: rgba(235,235,235,1);
                border-radius: $fontSize;
                transition: all 1s;
                &:hover {
                    box-shadow: 0 0 10px rgba(0,0,0,0.5);
                    background-color: rgba(255, 135, 0,0.5);
                    transform: scale(1.1);
                }
                &.active {
                    background-color: var(--backgroundColorHover);
                    transform: var(--transformHover);
                }
            }
        }
        .rightBox {
            flex: 0 0 $fontSize*32;
            height: $fontSize*36;
            .rightBoxTop {
                margin-bottom: $fontSize*0.2;
                width: $fontSize*32;
                height: $fontSize*24;
                display: flex;
            }
        }
   }
</style>