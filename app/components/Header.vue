<template>
    <header>
        <div class="navTop">
            <div class="logo">
                <img src="../assets/img/logo.jpg" alt="logo">
                <span>你好呀<i>{{ userDB.username}}</i>,欢迎来到FZWEB系统</span>
            </div>
            <div class="searchBox" v-show="searchStatus">
                    <input type="text" v-model="inputTxt" placeholder="请输入您的问题">
                    <button class="searchBtn" @click="">搜索</button>
            </div>
            <button class="toggleBtn" @click="searchStatus=!searchStatus">{{ searchStatus? '叠' : '搜' }}</button>
            <ul >
                <li  v-for="(item, index) in headerTitleInfo" :key="item.name"><NuxtLink :to="item.path" :class="{active: $route.path === item.path}">{{ item.name }}</NuxtLink></li>
                <li class="userInfo" @click="infotoggle"><img src="../assets/img/userimg.jpg" alt="user">{{ userDB.username }}</li>
            </ul>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { useHomeStore } from '../stores/homeStore';
    import { useAccountStore } from '../stores/accountStore';
    const homeStore = useHomeStore()
    const accountStore = useAccountStore()

    const searchStatus = ref<boolean>(false)
    const inputTxt = ref<string>('')
    const infoToggle = ref<boolean>(false)
    const headerTitleInfo = homeStore.$state.headerTitleInfo
    const userDB = accountStore.getCookie("token", "fuzao_secret_key") as {username:string,token:string}
    const infotoggle = () => navigateTo('/usercenter')

    // onMounted(() => {
    //     CookieTools.getCookie("token", "fuzao_secret_key")
    // })



</script>

<style scoped>
    @import url('../assets/css/header.css');
</style>