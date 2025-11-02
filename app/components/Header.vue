<template>
    <header>
        <div class="navTop">
            <div class="logo">
                <img src="../assets/img/logo.jpg" alt="logo">
                <span>你好呀<i>{{ userInfo}}</i>,欢迎来到FZWEB系统</span>
            </div>
            <div class="searchBox" v-show="searchToggle">
                    <input type="text" v-model="searchInput" placeholder="请输入您的问题">
                    <button class="searchBtn" @click="">搜索</button>
            </div>
            <button class="toggleBtn" @click="handleSearchToggle">{{ searchToggle? '叠' : '搜' }}</button>
            <ul >
                <li  v-for="(item, index) in headerTitleInfo" :key="item.name"><NuxtLink :to="item.path" :class="{active: $route.path === item.path}">{{ item.name }}</NuxtLink></li>
                <li class="userInfo" @click="toUserCenter"><img src="../assets/img/userimg.jpg" alt="user">{{ userInfo }}</li>
                <li class="logout" @click="logout">退出</li>
            </ul>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { TokenTools } from '../utils/utilsTokenTools'
    const tokenTools = new TokenTools()
    const userInfo = computed(() => {
        const tokenRes = tokenTools.getCookie('token', 'fuzao_secret_key') as {username:string}
        return tokenRes?.username || '状态检查中'
    })
    const searchToggle = ref(false)
    const searchInput = ref('')
    const handleSearchToggle = () => searchToggle.value =!searchToggle.value
    const headerTitleInfo = [{name: '首页',path: '/home'},{name: '媒体',path: '/media'},{name: '文章',path: '/article'},{name: '工具',path: '/tool'}]
    const toUserCenter = () => navigateTo('/usercenter')
    const logout = () => {
        tokenTools.clearCookie('token')
        navigateTo('/login')
    }

</script>

<style scoped>
    @import url('../assets/css/header.css');
</style>