<!-- 这是/home页面的网络工具组件 -->
<template>
    <ul class="web-tool">
        <li v-for="(item,index) in cardList" class="card" @click="" :class="{active:numCounter%12 === index*2+7  }" :style="changeStyle">
            <div v-show="numCounter%12 !== index*2+7" class="web-tool-front">{{ item.titleA }}</div>
            <div v-show="numCounter%12 === index*2+7" class="web-tool-back" >{{ item.titleB }}</div>
        </li>
    </ul>
</template>
<script setup lang="ts">
    import { useTimerStore } from '#imports'
    const timerStore = useTimerStore()
    const cardList = [
        {titleA: '1正面', titleB: '1反面'}, 
        {titleA: '2正面', titleB: '2反面'}, 
        {titleA: '3正面', titleB: '3反面'}
    ]
    const numCounter = ref<number>(12)
    const color = ref<string>('')
    const changeStyle = computed(() => {
        return { '--transformHover': 'rotateY(180deg)',
            '--backgroundColorHover':  color.value,
        }
    })
    watch(timerStore.$state, (newVal) => {
        numCounter.value = newVal.homeWebTooltime
        color.value = newVal.color
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
    transform: var(--transformHover);
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
    background-color:var(--backgroundColorHover);
    transform: rotateY(-180deg);
}
</style>