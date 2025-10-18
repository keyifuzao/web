<template>
    <div>
        <h1>Welcome to Nuxt.js</h1>
        <p>{{ "Token: "  }}</p>
        <button @click="toggle =!toggle">模态框</button>
    </div>
</template>
<style scoped>
    @import url("~/assets/css/main.css");
</style>
<script setup lang="ts">

    const toggle =ref(false)
    import Cookies from 'js-cookie'
    import CryptoJS from 'crypto-js'


    const SetCookies=(username: string, CookieName: string): void =>{
      Cookies.set(CookieName, username, { maxAge: 3600, path: '/' ,sameSite: 'lax' });
    }

    const CryptoInfo=(data: string, secretKey: string): string =>{
      return CryptoJS.AES.encrypt(data, secretKey).toString()
    }

</script>