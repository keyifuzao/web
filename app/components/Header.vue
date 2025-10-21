<template>
    <header>
        <div class="navTop">
            <div class="logo">
                <img src="../assets/img/logo.jpg" alt="logo">
                <span>你好呀<i>{{ userDB }}</i>,欢迎来到FZWEB系统</span>
            </div>
            <div class="searchBox" v-show="searchStatus">
                    <input type="text" v-model="inputTxt" placeholder="请输入您的问题">
                    <button class="searchBtn" @click="">搜索</button>
            </div>
            <button class="toggleBtn" @click="searchStatus=!searchStatus">{{ searchStatus? '叠' : '搜' }}</button>
            <ul >
                <li  v-for="(item, index) in headerTitleInfo" :key="item.name"><NuxtLink :to="item.path" :class="{active: $route.path === item.path}">{{ item.name }}</NuxtLink></li>
                <li class="userInfo" @click="infotoggle"><img src="../assets/img/userimg.jpg" alt="user">{{ userDB }}</li>
            </ul>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { useHomeStore } from '../stores/homeStore';
    import { UtilsCookieTools } from '../utils/utilsAccount';


    const homeStore = useHomeStore()
    const CookieTools = new UtilsCookieTools()

    const searchStatus = ref<boolean>(false)
    const inputTxt = ref<string>('')
    const infoToggle = ref<boolean>(false)
    const headerTitleInfo = homeStore.$state.headerTitleInfo
    const date = new Date()
    const userDB = CookieTools.cookies.value?.username || '游客'
    const infotoggle = () => navigateTo('/usercenter')



</script>

<style scoped>
    @import url('../assets/css/header.css');
</style>