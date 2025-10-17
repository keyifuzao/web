<template>
    <div>
        <h1>Welcome to Nuxt.js</h1>
        <p>{{ "Token: "  }}</p>
        <button @click="toggle=!toggle">模态框</button>
    </div>
</template>
<style scoped>
    @import url("~/assets/css/main.css");
</style>
<script setup lang="ts">

    const toggle =ref(false)
    const Cookies = useCookie('test',{
        maxAge: 3600,
        readonly:false,
        encode:(value)=>JSON.stringify(value),
        sameSite:'strict',
      });

        const SetCookies =(username: string, password: string): void => {
            Cookies.value = `${username}&${password}`
        }

        SetCookies('fuzao','123456')

</script>