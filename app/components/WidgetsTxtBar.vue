<!-- 这个是home文章的组件 -->
<template>
    <div class="txt-bar">
        <div class="clickbtnBox">
            <select v-model="source">
                <option value="baidu">百度</option>
                <option value="bilibili">哔哩哔哩</option>
                <option value="zhihu">知乎</option>
                <option value="jinritoutiao">今日头条</option>
                <option value="tengxunwang">腾讯网</option>
            </select>
            <button @click="getHotNews()">刷新</button>
        </div>
        <ul class="newsList">
            <li v-for="(item, index) in hotNewsList" :key="item.title" v-show="index < 6">
                <div>
                    <h2 class="txt-bar-title">{{item.title}}</h2>
                    <b><i>{{ item.source }}</i> {{item.publish_time}}</b>
                </div>
                <p><NuxtLink :to="item.url" target="_blank">{{ item.content }}</NuxtLink></p>
            </li>
        </ul>
    </div>
</template>
<script setup>
    import { NuxtLink } from '#components'
    import { useWebFetchStore } from '~/stores/webFetchStore'
    const source = ref('baidu')
    const hotNewsList= ref([])
    const webFetchStore = useWebFetchStore()
    const getHotNews = () => {
        webFetchStore.$patch({
            source: source.value
        })
        webFetchStore.fetchHomePageNews()
    }
    const webInit = () => {
        if (webFetchStore.homePageNews){
            hotNewsList.value = webFetchStore.homePageNews
        }else{
            webFetchStore.fetchHomePageNews()
        }
    }
    watch(webFetchStore.$state, (newVal)=>{
        if(newVal.homePageNews){
            hotNewsList.value = newVal.homePageNews
        }
    })
    onMounted(() => {
        webInit()
    })
</script>
<style scoped lang="scss">
    $fontSize: 0.12rem;
    .txt-bar {
        width:$fontSize*24;
        height:100%;
        background-color:rgb(235, 235, 235);
        border-radius: $fontSize;
        .clickbtnBox {
            height: $fontSize*1.2;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            background-color: yellow;
            select {
                margin: $fontSize*0.2;
            }
        }

    }
    /* .txt-bar {
        width: 565px;
        height: 516px;
        background-color: rgb(235, 235, 235);
        margin-top: 10px;
        border-radius: 20px;
    }
    .txt-bar .clickbtnBox {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .txt-bar button {
        margin:10px;
        margin-right: 20px;
        width: 80px;
        height: 20px;
        background-color: rgb(200, 200, 200);
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }
    .txt-bar select {
        margin:10px;
        width: 80px;
        height: 20px;
        background-color: rgb(200, 200, 200);
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }
    .txt-bar ul {
        list-style: none;
        margin: 0 auto;
        padding: 0;
        width: 520px;
        height: 480px;
    }
    .txt-bar ul li {
        border-radius: 10px;
        cursor: pointer;
    }
    .txt-bar ul li:hover{
        background-color: rgba(255, 135, 0,0.3);
        transform: scale(1.05);
        transition: all 0.5s ease-out;  
    }

    .txt-bar ul li div{
        margin: 0;
        width: 100%;
        height: 25px;
        display: flex;
        align-items: center;

    }
    .txt-bar ul li div h2 {
        flex:2;
        width: 200px;
        font-size: 18px;
        font-weight: bold;
        color: rgb(30, 30, 30);
        margin: 0 auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .txt-bar ul li div b {
        flex:1;
        width: 200px;
        font-size: 14px;
        color: #666;
        text-align: right;
        margin: 0 auto;
    }   

    .txt-bar ul li p{
        display:block;
        width: 100%;
        height: 45px;
        margin: 0 auto 6px;
        font-size: 16px;
        line-height: 24px;
        color: #808080;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .txt-bar ul li p a{
        color: rgb(120,120,120);
        text-decoration: none;
    } */
</style>
