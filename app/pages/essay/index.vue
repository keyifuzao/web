<template>
    <Header></Header>
    <main class="article_box">
        <ActicalPartLeft></ActicalPartLeft>
        <ActicalPartMid></ActicalPartMid>
        <ActicalPartRight></ActicalPartRight>
    </main>
    <Footer></Footer>
</template>

<script setup lang="ts">
    // definePageMeta({
    //     middleware: ['auth'],
    // })
</script>
<style scoped>
    .article_box {
        display: flex;
        width: 1800px;
        height: 800px;
        margin: 20px auto;
    }
</style>