<!-- 这是/home页面的网络工具组件 -->
<template>
    <ul class="web-tool">
        <li v-for="(item,index) in cardList" class="card" @click="" :class="{active:item.Status[idx]![1]}">
            <div v-show="item.Status[idx]![0]" class="web-tool-front">{{ item.titleA }}</div>
            <div v-show="item.Status[idx]![1]" class="web-tool-back" >{{ item.titleB }}</div>
        </li>
    </ul>
</template>
<script setup lang="ts">
    import { useHomeStore } from '../stores/homeStore'
    const cardList = [
        {titleA: '1正面', titleB: '1反面',Status:[[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[0,1],[1,0],[1,0],[1,0],[1,0]]}, 
        {titleA: '2正面', titleB: '2反面',Status:[[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[0,1],[1,0],[1,0]]}, 
        {titleA: '3正面', titleB: '3反面',Status:[[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[1,0],[0,1]]}
    ]
    // onMounted(() => {
    //     toogleCard()
    // })
    const idx = ref<number>(0)
    const homeStore = useHomeStore()
    // const toogleCard = () => {
    //     homeStore.autoStylePlay.timerCount = 0
    //     homeStore.AutoPlayCompute
    // }
    watch(homeStore.autoStylePlay, (val) => {
        idx.value = homeStore.autoStylePlay.timerCount % 12
    })
</script>

<style scoped>
.web-tool {
    list-style: none;
    margin: 10px 0 0 10px;
    padding: 0;
    width: 165px;
    height: 165px;
    perspective: 1000px;
}
.web-tool .card{
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;
    width: 165px;
    height: 165px;
    transition: transform 1s ;
    transform-style: preserve-3d;

}
.web-tool .card.active{
    transform: rotateY(180deg);
}
.card .web-tool-front, .card .web-tool-back{
    position: absolute;
    width: 165px;
    height: 165px;
    border-radius: 10px;
    background-color: rgb(235, 235, 235);
    backface-visibility: hidden;
}
.card .web-tool-back{
    background-color: rgba(255,135,0,0.5);
    transform: rotateY(-180deg);
}
</style>