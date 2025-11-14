<template>
    <header>
        <nav class="navTop">
            <div class="logo">
                <img src="../assets/img/logo.jpg" alt="logo">
                <span>你好呀<i>{{ userInfo}}</i>,欢迎来到FZWEB系统</span>
            </div>
            <div class="searchBox" >
                <input id="searchInput" type="text" v-model="searchInput" placeholder="请输入您的问题">
                <button id="searchBtn" @click="">搜索</button>
            </div>
            <ul class="navList">
                <li id="nav" v-for="(item, index) in headerTitleInfo" :key="item.name" :class="{active: $route.path === item.path}"><NuxtLink :to="item.path" >{{ item.name }}</NuxtLink></li>
                <li id="userInfo" @click="toUserCenter"><img src="../assets/img/userimg.jpg" alt="user">{{ userInfo }}</li>
                <li id="logout" @click="logout">退出</li>
            </ul>
        </nav>
    </header>
</template>

<script setup lang="ts">
    import { useAccountStore } from '#imports'
    import { cookiesTools } from '#imports'
    import { useTimerStore } from '#imports'
    const timerStore = useTimerStore()
    const accountStore = useAccountStore()
    const cookieTools = new cookiesTools()
    const userInfo = ref('')
    const searchInput = ref('')
    const headerTitleInfo = [{name: '首页',path: '/home'},{name: '媒体',path: '/media'},{name: '文章',path: '/essay'},{name: '工具',path: '/tool'}]
    const toUserCenter = () => navigateTo('/usercenter')
    const logout = () => {
        cookieTools.clearCookie('userInfo')
        accountStore.clearToken()
        navigateTo('/login')
    }
    onMounted(() => {
        timerStore.startTimer()
        const userName = cookieTools.getCookie('token', 'fuzao_secret_key')? cookieTools.getCookie('token', 'fuzao_secret_key').username : '状态检查中'
        userInfo.value = accountStore.username ? accountStore.username : userName

    })
    onUnmounted(() => {
        timerStore.stopTimer()
    })
</script>

<style scoped lang="scss">
    // @use '../assets/scss/variables' as _varStyle;
    @use '../assets/scss/headerStyle' as _hStyle;
    $fontSize: 0.12rem;
    $bgColor: rgba(235,235,235,1);
    $color: rgba(10,10,10,1);
    $selectedColor: rgba(255,110,0,1);
    .navTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: $fontSize*75;
        margin: $fontSize*1.2 auto;
        @include _hStyle.headerStyle($fontSize,$bgColor,$color,$selectedColor);
        // @each $name, $params in ('xxlarge': 0.12rem ,'xlarge':0.14rem,'large':0.16rem,'medium':0.25rem,'small':0.3rem,'xsmall':0.38rem,'xxsmall':0.48rem){
        //     @include _varStyle.responsive($name){
        //         @if $name == 'xxlarge'{
        //             @include _hStyle.headerStyle($params,$bgColor,$color,$selectedColor);
        //         }@else if $name == 'xlarge' or $name == 'large'{
        //             @include _hStyle.headerStyleSEA($params,$bgColor,$color,$selectedColor);
        //         }@else{
        //             @include _hStyle.headerStyleSEB($params,$bgColor,$color,$selectedColor);
        //         }
        //     }
        // }
    }
</style>