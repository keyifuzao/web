<template>
    <header>
        <div class="navTop">
            <div class="logo">
                <img src="../assets/img/logo.jpg" alt="logo">
                <span>你好呀<i>{{ userDB }}</i>,欢迎来到FZWEB系统{{  }}</span>
            </div>
            <div class="searchBox" v-show="searchStatus">
                    <input type="text" v-model="inputTxt" placeholder="请输入您的问题">
                    <button class="searchBtn" @click="">搜索</button>
            </div>
            <button class="toggleBtn" @click="searchStatus=!searchStatus">{{ searchStatus? '叠' : '搜' }}</button>
            <ul >
                <li  v-for="(item, index) in headerTitleInfo" :key="item.name"><NuxtLink :to="item.path" :class="{active: $route.path === item.path}">{{ item.name }}</NuxtLink></li>
                <li class="userInfo" @click="infotoggle"><img src="../assets/img/userimg.jpg" alt="user">{{ userDB }}
                    <ol class="userMenu" v-show="infoToggle">
                        <li><a href="">个人中心</a></li>
                        <li><a href="">退出</a></li>
                    </ol>
                </li>
            </ul>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { useWebSettingStore } from '../stores/initwebsettingStore';
    import { useLoginStore } from '../stores/loginStore'

    const WebSettingStore = useWebSettingStore()
    const loginStore = useLoginStore()

    const searchStatus = ref<boolean>(false)
    const inputTxt = ref<string>('')
    const infoToggle = ref<boolean>(false)
    const userDB = ref<string>('')
    const headerTitleInfo = WebSettingStore.$state.headerTitleInfo
    const date = new Date()

    // const usrInfo = () => {
    //     navigateTo('/usercenter')
    // }

    const infotoggle = () => infoToggle.value = !infoToggle.value

    // watch(loginStore.$state, (newVal, oldVal) => {
    //     if (newVal.successUser !== oldVal.successUser) {
    //         WebSettingStore.$state.userAccountInfo.user = newVal.successUser
    //     }
    // })
    // const initData = () => {
    //     loginStore.getTokenUser
    //     userDB.value = loginStore.$state.decodedRes
    // }
    // onMounted(() => {
    //     initData()
    // })



</script>

<style scoped>
    @import url('../assets/css/header.css');
</style>