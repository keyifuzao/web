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
                <div class="txtBarTitle">
                    <h2>{{item.title}}</h2>
                    <b><i>{{ item.source }}</i> {{item.publish_time.split(' ')[1]}}</b>
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
    $color:rgb(30, 30, 30);
    $showColor:rgb(120,120,120);
    $selectColor:rgb(235,135,0);
    $bgcolor:rgb(235, 235, 235);
    $inputBgColor:rgb(200, 200, 200);
    .txt-bar {
        margin-right: $fontSize*0.5;
        width:$fontSize*24;
        height:100%;
        background-color:$bgcolor;
        border-radius: $fontSize;
        .clickbtnBox {
            height: $fontSize*1.5;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            select {
                margin: 0 $fontSize*0.5;
                width: $fontSize*4;
                height: $fontSize*1;
                border-radius:$fontSize*0.5 ;
                font-size: $fontSize*0.6;
                border: none;
                outline: none;
                background-color: $inputBgColor;
            }
            button {
                margin: 0 $fontSize*0.5;
                width: $fontSize*4;
                height: $fontSize*1;
                border-radius:$fontSize*0.5 ;
                font-size: $fontSize*0.6;
                border: none;
                background-color: $inputBgColor;
                cursor: pointer;
            }
        }
        .newsList {
            list-style: none;
            margin: 0 auto;
            padding: $fontSize*0.6;
            .txtBarTitle {
                display: flex;
                h2 {
                    margin: 0;
                    flex:0 0 $fontSize*14;
                    font-size: $fontSize*0.8;
                    font-weight: bold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                b {
                    margin: 0;
                    flex:1;
                    font-size: $fontSize*0.6;
                    color: $color;
                    text-align: right;
                }
            }
            p {
                margin: $fontSize*0.4 0 ;
                font-size: $fontSize*0.8;
                color: $color;
                overflow: hidden;
                text-overflow: ellipsis;
                a{
                    display: block;
                    color: $color;
                    text-decoration: none;
                    height: $fontSize*1.8;
                    color: $showColor;
                    &:hover{
                        color: $color;
                    }
                }
            }
        }

    }
</style>
