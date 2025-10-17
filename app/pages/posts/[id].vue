<template>
    <div>
        <h1>01</h1>
        <p>This is the post page of the Nuxt.js</p>
    </div>
</template>

<script setup lang="ts">
    const route = useRoute()
    console.log(route.params.id)
</script>