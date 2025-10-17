<template>
    <Header></Header>
    <main class="projectB_box">
        <h1>项目B展示页</h1>
        <p>此页面正在开发中，敬请期待</p>
    </main>
    <Footer></Footer>
</template>

<script setup lang="ts">
    definePageMeta({
        middleware: ['auth'],
    })
</script>

<style scoped>
    .projectB_box {
        width: 1200px;
        height: 800px;
        margin: 0 auto;
        background-color: rgb(230, 230, 230);
    }
</style>