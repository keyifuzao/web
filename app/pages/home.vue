<template>
    <Header></Header>
    <main class="home_box">
        <DisplayPic></DisplayPic>
        <div class="middle_box">
            <WidgetsClock :class="{active: isActive_clock?true:false}"></WidgetsClock>
            <WidgetsTimeCounter :class="{active: isActive_timeCounter?true:false}"></WidgetsTimeCounter>
            <WidgetsDays :class="{active: isActive_days?true:false}"></WidgetsDays>
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
    import Footer from '~/components/Footer.vue';
    import Header from '~/components/Header.vue';

    definePageMeta({
        middleware: ['auth'],
    })

    const isActive_clock = ref(0);
    const isActive_timeCounter = ref(0);
    const isActive_days = ref(0);
    const toggleActive = () => {
        const status = [[1,0,0],[0,1,0],[0,0,1]]
        setInterval(() => {
            const random = Math.floor(Math.random() * 3);
            isActive_clock.value = status[random]![0] as number;
            isActive_timeCounter.value = status[random]![1] as number;
            isActive_days.value = status[random]![2] as number;
        }, 4000)
        }
    onMounted(() => {
        toggleActive();
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