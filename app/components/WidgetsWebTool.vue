<!-- 这是/home页面的网络工具组件 -->
<template>
    <ul class="webToolList">
        <li v-for="(item,index) in cardList" class="webTool">
            <div class="card" @click="" :class="{active: showCard(index)  }" :style="changeStyle">
                <div v-show="!showCard(index)" class="webToolFront">{{ item.titleA }}</div>
                <div v-show="showCard(index)" class="webToolBack" >{{ item.titleB }}</div>
            </div>
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
    const showCard = (index: number) => {
        return numCounter.value % 12 === index * 2 + 7 ? true : false
    }
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

<style scoped lang="scss">
    $fontSize: 0.12rem;
    $bgColor: rgba(235,235,235,1);
    $color: rgba(10,10,10,1);
    $selectedColor: rgba(255,110,0,1);
    .webToolList {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin: 0;
        padding: 0;
        .webTool {
            display: block;
            list-style: none;
            width: $fontSize*7.8;
            height: $fontSize*7.8;
            perspective: 1000px;
            .card {
                position: relative;
                cursor: pointer;
                width: 100%;
                height: 100%;
                transition: transform 1s ;
                transform-style: preserve-3d;
                &.active {
                    transform: var(--transformHover);
                }
            }
            .webToolFront, .webToolBack{
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: $fontSize*0.8;
                background-color: rgb(235, 235, 235);
                backface-visibility: hidden;
            }
            .webToolBack{
                background-color:var(--backgroundColorHover);
                transform: rotateY(-180deg);
            }
        }
    }
</style>