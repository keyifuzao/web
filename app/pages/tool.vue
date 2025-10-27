<template>
    <Header></Header>
    <div class="codeBox">
        <div class="codeBoxPartOne">
            <h1>About</h1>
            <p>This is the about page of the Nuxt.js application.</p>
        </div>
        <div class="codeBoxPartTwo">
            <h2>About Me</h2>
            <p>I am a web developer and I love building web applications using Nuxt.js.</p>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup lang="ts">


</script>
<style scoped>
    .codeBox {
        display: flex;
        justify-content: space-between;
        margin: 20px auto;
        width: 1800px;
        height: 900px;
    }
    .codeBoxPartOne , .codeBoxPartTwo {
        margin: 10px;
        width: 880px;
        height: 880px;
        border-radius: 30px;
        background-color: rgb(235, 235, 235)
    }

</style>