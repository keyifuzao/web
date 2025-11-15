<!-- 这个是home页面显示图片轮播的组件 -->
<template>
    <div class="leftPic">
        <div class="playPic" >
            <h2>{{ picList[activeIndex]?.title as string}}</h2>
            <img :src="activePic" alt="home" @mouseover.self="mouseoverHandler()" @mouseleave.self="mouseoutHandler()">
        </div>
        <ul class="playList">
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
        {name:"homeG",pUrl:"/_nuxt/assets/img/homeG.jpg",title:"海上的黑云"},
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
<style scoped lang="scss">
    $fontSize:0.12rem;
   .leftPic {
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        width: $fontSize*30;
        .playPic {
            margin-bottom: $fontSize*0.5;
            width: $fontSize*30;
            height: $fontSize*30;
            h2 {
                position: absolute;
                z-index: 10;
                font-size: $fontSize*1.2;
                font-weight: bold;
                margin: 0;
                padding: 0;
                text-align: center;
                color: white;
            }
            img {
                width: $fontSize*30;
                height: $fontSize*30;
                border-radius: 20px;
                transition: all 0.3s ease-in-out;
                &:hover {
                    transform: scale(1.05);
                    transition: all 0.5s ease-in-out;
                }
            }
        }
        .playList {
            margin: $fontSize*0.5 0 0 0;
            padding: 0;
            display: flex;
            width: $fontSize*30;
            height: $fontSize*5;
            li {
                list-style: none;
                margin: $fontSize*0.1;
                img {
                    width: $fontSize*4.8;
                    height: $fontSize*4.8;
                    &:hover {
                        transform: scale(1.1);
                        transition: all 0.3s ease-in-out;
                    }
                }
                &.active {
                    box-shadow: 0px 0px 10px black;
                    transform: scale(1.1);
                }
                &:hover {
                    transform: scale(1.1);
                    transition: all 0.3s ease-in-out;
                }
            }
        }
    }
</style>