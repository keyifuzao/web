<template>
    <Header></Header>
    <div class="codeBox">
        <ul>
            <li v-for="(item,index) in toolItems" :class="{active:index===activeIndex}" :style="changeStyle" @click="toToolPage(item.tool_id)"><h3>{{ item.toolName }}</h3><p>{{ item.toolDesc }}</p></li>
        </ul>
    </div>
    <Footer></Footer>
</template>

<script setup lang="ts">
    let timer: any;
    const toolItems = [
        {tool_id:'tools01',toolName: '简历', toolDesc: '在线简历制作工具', toolImg: '', toolLink: ''},
        {tool_id:'tools02',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools03',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools04',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools05',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools06',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools07',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools08',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools09',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},    
        {tool_id:'tools10',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools11',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools12',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools13',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools14',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools15',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools16',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools17',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools18',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools19',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools20',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
        {tool_id:'tools21',toolName: '开发中', toolDesc: '开发中', toolImg: '', toolLink: ''},
    ]
    const activeIndex = ref<number>()
    const colorRed = ref<number>()
    const colorGreen = ref<number>()
    const colorBlue = ref<number>()
    const changeStyle = computed(() => {
        return {'--backgroundColorHover': `rgb(${colorRed.value}, ${colorGreen.value}, ${colorBlue.value})`}
    })
    const toToolPage = (id: string) =>{
        return navigateTo(`/tool/${id}`)
    }
    onMounted(() => {
    timer = setInterval(() => {
        colorRed.value = Math.floor(Math.random() * 255)
        colorGreen.value = Math.floor(Math.random() * 255)
        colorBlue.value = Math.floor(Math.random() * 255)
        activeIndex.value = Math.floor(Math.random() * toolItems.length)
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
        background-color:var(--backgroundColorHover);
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