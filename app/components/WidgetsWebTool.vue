<!-- 这是/home页面的网络工具组件 -->
<template>
    <ul class="web-tool">
        <li class="cardA" @click="toogleCardA=!toogleCardA" :class="{active:toogleCardA}">
            <div v-show="!toogleCardA" class="web-tool-front">1正面</div>
            <div v-show="toogleCardA" class="web-tool-back" >1反面</div>
        </li>
        <li class="cardA" @click="toogleCardB=!toogleCardB" :class="{active:toogleCardB}">
            <div v-show="!toogleCardB" class="web-tool-front">2正面</div>
            <div v-show="toogleCardB" class="web-tool-back" >2反面</div>
        </li>
        <li class="cardA" @click="toogleCardC=!toogleCardC" :class="{active:toogleCardC}">
            <div v-show="!toogleCardC" class="web-tool-front">3正面</div>
            <div v-show="toogleCardC" class="web-tool-back" >3反面</div>
        </li>
    </ul>
</template>
<script setup lang="ts">
    const toogleCardA = ref<boolean>(false)
    const toogleCardB = ref<boolean>(false)
    const toogleCardC = ref<boolean>(false)

    const toogleCard = (index: number) => {
        switch (index) {
            case 1:
                toogleCardA.value = !toogleCardA.value
                break;
            case 2:
                toogleCardB.value = !toogleCardB.value
                break;
            case 3:
                toogleCardC.value = !toogleCardC.value
                break;
            default:
                break;
        }
    }

    const autoToogleCard = () => {
        setInterval(() => {
            toogleCard(Math.floor(Math.random() * 3) + 1)
        }, 4000)
    }

    onMounted(() => {
        autoToogleCard()
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
.web-tool .cardA{
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;
    width: 165px;
    height: 165px;
    transition: transform 1s ;
    transform-style: preserve-3d;

}
.web-tool .cardA.active{
    transform: rotateY(180deg);
}
.cardA .web-tool-front, .cardA .web-tool-back{
    position: absolute;
    width: 165px;
    height: 165px;
    border-radius: 10px;
    background-color: rgb(235, 235, 235);
    backface-visibility: hidden;
}
.cardA .web-tool-back{
    background-color: rgba(255,135,0,0.5);
    transform: rotateY(-180deg);
}
</style>