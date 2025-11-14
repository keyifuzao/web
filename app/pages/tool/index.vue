<template>
    <Header></Header>
    <div class="codeBox">
        <ul id="devtool">
            <li v-for="(item,index) in toolItems" :class="{active:numCounter%21 === index+1}" :style="changeStyle" @click="toToolPage(item.tool_id)"><h3>{{ item.toolName }}</h3><p>{{ item.toolDesc }}</p></li>
        </ul>
        <ul id="weblink">
            <li v-for="(item,index) in webLinks"></li>
        </ul>
    </div>
    <Footer></Footer>
</template>

<script setup lang="ts">
    import { useTimerStore } from '#imports'
    const toolStore = useTimerStore()
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
    const webLinks = [
        {webName: 'nuxt', webLink: ''},
        {webName: 'vue', webLink: ''},
        {webName: 'react', webLink: ''},
        {webName: 'golang', webLink: ''},
        {webName: 'python', webLink: ''},
        {webName: 'java', webLink: ''},
        {webName: 'php', webLink: ''}
    ]
    const numCounter = ref<number>(22)
    const color = ref<string>('')
    const changeStyle = computed(() => {
        return {'--backgroundColorHover': color.value}
    })
    const toToolPage = (id: string) =>{
        return navigateTo(`/tool/${id}`)
    }

    watch(toolStore.$state, (newVal)=>{
        color.value = newVal.toolcolor
        numCounter.value = newVal.toolstime
    })
    onMounted(() => {
        toolStore.getRandomtime()
    })
    onUnmounted(() => {
        toolStore.stoptoolTimer()
    })
</script>
<style scoped lang="scss">
    $fontSize: 0.12rem;
    $bgColor: rgb(235, 235, 235);
    $hoverColor: rgb(235, 135, 0);
    $color: rgb(50, 50, 50);
    .codeBox {
        margin: 0 auto;
        width: $fontSize*75;
        height: $fontSize*36;
        #devtool {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-gap: $fontSize*0.8;
            width: 100%;
            height: $fontSize*32;
            list-style: none;
            margin: 0;
            padding: 0;
            li {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: $fontSize*10;
                height: $fontSize*10;
                border-radius: $fontSize;
                background-color: $bgColor;
                cursor: pointer;
                &:hover {
                    background-color: $hoverColor;
                    transform: scale(1.1);
                    transition: all 0.3s ease-in-out;
                }
                &.active {
                    background-color: var(--backgroundColorHover);
                    transform: scale(1.1);
                    transition: all 0.3s ease-in-out;
                }
                h3 {
                    margin: 0;
                    padding: 0;
                    font-size: $fontSize;
                    font-weight: bold;
                    color: $color;
                    text-align: center;
                }
                p {
                    margin: $fontSize*0.5 0;
                    padding: 0;
                    font-size: $fontSize*0.6;
                    font-weight: lighter;
                    color: $color;
                    text-align: center;
                }
            }
        }
        #weblink {
            margin: $fontSize 0 0 0;
            padding: 0;
            width: 100%;
            height: $fontSize*3;
            list-style: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
            li {
                width: $fontSize*10;
                height: $fontSize*3;
                background-color: $bgColor;
                border-radius: $fontSize;
                cursor: pointer;
                &:hover {
                    background-color: $hoverColor;
                    transform: scale(1.1);
                    transition: all 0.3s ease-in-out;
                }
            }
        }
    }
</style>