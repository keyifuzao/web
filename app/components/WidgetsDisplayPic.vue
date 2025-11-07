<!-- 这个是home页面显示图片轮播的组件 -->
<template>
    <div class="leftPic">
        <div class="playPic" >
            <h2>{{ picList[activeIndex]?.title as string}}</h2>
            <img :src="activePic" alt="home" @mouseover.self="mouseoverHandler()" @mouseleave.self="mouseoutHandler()">
        </div>
        <ul>
            <li v-for="(pic,index) in picList" :key="pic.name" @click="changePic(index)" :class="{active:index===activeIndex}"><img :src="pic.pUrl" :alt="pic.name"></li>
        </ul>
    </div>
</template>
<script setup lang="ts">
    import { useTimerStore } from '#imports'
    const timerStore = useTimerStore()
    const picList = [
        {name:"homeA",pUrl:"/_nuxt/assets/img/homeA.jpg",title:"爱上早晨的阳光"},
        {name:"homeB",pUrl:"/_nuxt/assets/img/homeB.jpg",title:"城市的色彩"},
        {name:"homeC",pUrl:"/_nuxt/assets/img/homeC.jpg",title:"湛蓝的天空"},
        {name:"homeD",pUrl:"/_nuxt/assets/img/homeD.jpg",title:"佛光普照"},
        {name:"homeE",pUrl:"/_nuxt/assets/img/homeE.jpg",title:"水花的瞬间"},
        {name:"homeF",pUrl:"/_nuxt/assets/img/homeF.jpg",title:"城市的美好"},
        {name:"homeG",pUrl:"/_nuxt/assets/img/homeG.jpg",title:"海上的黑云"}
    ]
    watch(timerStore.$state, (newVal)=>{
        numCounter.value = newVal.homePictime
    })
    const setPic = ref("/_nuxt/assets/img/homeA.jpg")
    const activePic = computed(() => {
        return picList[activeIndex.value]?.pUrl
    })
    const activeIndex = computed(() => {
        return numCounter.value % picList.length
    })
    const numCounter = ref(7)
    const changePic = (index: number) => {
        setPic.value = picList[index]?.pUrl as string
        numCounter.value = index
        timerStore.$patch({homePictime: index})
    }
    const mouseoverHandler = () => {
        timerStore.stopPicTimer()
    }
    const mouseoutHandler = () => {
        timerStore.startPicTimer()
    }
    onMounted(() => {
        timerStore.startPicTimer()
    })
    onUnmounted(() => {
        timerStore.stopPicTimer()
    })
</script>
<style scoped>
    .leftPic {
        margin: 0 0 0 10px;
        width: 700px;
        height: 100%;
    }

    .leftPic .playPic {
        position: relative;
        width: 680px;
        height: 680px;
        border-bottom: 2px solid rgb(180, 180, 180);
    }
    .leftPic .playPic img {
        position: absolute;
        z-index: 1;
        width: 660px;
        height: 660px;
        margin: 10px;
        border-radius: 20px;
        transition: all 0.3s ease-out;
    }
    .leftPic .playPic img:hover {
        transition: all 0.3s ease-out;
        transform: scale(1.05);
    }
    .leftPic .playPic h2 {
        position: absolute;
        left:30px;
        z-index: 2;
        color: white;
    }
    .leftPic ul {
        display: flex;
        margin: 10px 0;
        align-items: baseline;
        padding: 0;
    }
    .leftPic ul li {
        list-style: none;
        margin: 3px;
        width: 90px;
        height: 90px;
        background-color: rgb(200, 200, 200);
        cursor: pointer;
    }
    .leftPic ul li :hover{
        border-radius: 20px;
        box-shadow: black 0px 0px 10px;
        transform: scale(1.1);
        transition: all 0.3s ease-out;
    }
    .leftPic ul li.active {
        border: 5px solid rgb(255, 135, 0);
        transform: scale(1.1);
    }
    .leftPic ul li img {
        width: 90px;
        height: 90px;
    }
</style>