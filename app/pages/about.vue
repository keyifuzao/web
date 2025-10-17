<template>
    <Header></Header>
    <div>
        <h1>About</h1>
        <p>This is the about page of the Nuxt.js application.</p>
        <img src="/img/01.jpeg" alt="照片" />
    </div>
    <Footer></Footer>
</template>

<script setup lang="ts">
    import Footer from '~/components/Footer.vue';
    import Header from '~/components/Header.vue';
    definePageMeta({
            middleware: ['auth'],
        })

</script>