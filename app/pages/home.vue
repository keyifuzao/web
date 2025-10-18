<template>
    <Header></Header>
    <main class="home_box">
        <DisplayPic></DisplayPic>
        <div class="middle_box">
            <WidgetsClock :class="{active: Status[idx]![0]}"></WidgetsClock>
            <WidgetsTimeCounter :class="{active: Status[idx]![1]}"></WidgetsTimeCounter>
            <WidgetsDays :class="{active: Status[idx]![2]}"></WidgetsDays>
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
    import { useHomeStore } from '../stores/homeStore';

    const homeStore = useHomeStore();
    const Status = [[0,0,0],[1,0,0],[0,0,0],[0,1,0],[0,0,0],[0,0,1],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
    const idx = ref<number>(0)
    const toogleCard = () => {
        homeStore.autoStylePlay.timerCount = 0
        homeStore.AutoPlayCompute
    }
    onMounted(() => {
        toogleCard()
    })
    watch(homeStore.autoStylePlay,(val)=>{
        idx.value = val.timerCount%12
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
        background-color: rgba(255, 135, 0,0.5);
        transform: scale(1.1);
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