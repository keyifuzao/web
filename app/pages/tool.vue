<template>
    <Header></Header>
    <div class="codeBox">
        <ul>
            <li v-for="(item,index) in toolItems" :class="{active:index===activeIndex}"><h3>{{ item.toolName }}</h3><p>{{ item.toolDesc }}</p></li>
        </ul>
    </div>
    <Footer></Footer>
</template>

<script setup lang="ts">
import { on } from 'events';

    let timer: any;

    const toolItems = [
        {toolName: '简历', toolDesc: '在线简历制作工具', toolImg: '', toolLink: ''},
        {toolName: '工具2', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具3', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具4', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具5', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具6', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具7', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具8', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具9', toolDesc: '开发中', toolImg: '', toolLink: ''},    
        {toolName: '工具10', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具11', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具12', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具13', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具14', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具15', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具16', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具17', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具18', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具19', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具20', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {toolName: '工具21', toolDesc: '开发中', toolImg: '', toolLink: ''},
    ]
    const activeIndex = ref<number>(0)
    // const colorRed = ref<number>(235)
    // const colorGreen = ref<number>(235)
    // const colorBlue = ref<number>(235)
    onMounted(() => {
    timer = setInterval(() => {
        // colorRed.value = Math.floor(Math.random() * 256)
        // colorGreen.value = Math.floor(Math.random() * 256)
        // colorBlue.value = Math.floor(Math.random() * 256)
        activeIndex.value = Math.floor(Math.random() * toolItems.length)
        console.log(activeIndex.value)
    }, 3000);
    })
    onUnmounted(() => {
        clearInterval(timer)
    })
</script>
<style scoped>
    .codeBox {
        display: flex;
        justify-content: space-between;
        margin: 20px auto;
        width: 1800px;
        height: 800px;
    }
    .codeBox ul {
        display: flex;
        justify-content: space-between;
        margin: 10px;
        padding: 0;
        list-style: none;
        width: 1780px;
        height: 780px;
        flex-wrap: wrap;

    }
    .codeBox ul li {
        width:240px;
        height: 240px;
        background-color: rgb(235, 235, 235);
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s;
    }
    .codeBox ul li:hover{
        background-color:rgba(235, 135, 0,0.6);
        transform: scale(1.1);
        transition: all 0.3s;
    }
    .codeBox ul li.active{
        background-color:rgba(235, 135, 0,0.6);
        transform: scale(1.1);
        transition: all 0.3s;
    }
    .codeBox ul li h3 {
        text-align: center;
        margin-top: 80px;
        padding: 0;
        font-size: 24px;
        font-weight: bold;
        color: #333;
    }
    .codeBox ul li p {
        text-align: center;
        margin: 0;
        padding: 0;
        font-size: 18px;
        color: #666;
    }

</style>