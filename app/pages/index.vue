<template>
    <header>
      <div class="title">
        <ul>
          <li><router-link to="#">Home</router-link></li>
          <li><router-link to="#">About</router-link></li>
          <li><router-link to="#">Contact</router-link></li>
        </ul>
      </div>
    </header>
    <main>
    </main>
    <footer>
    </footer>
</template>
<style scoped lang="scss">
@import "../assets/scss/variables"

</style>
<script setup lang="ts">
    const toggle =ref(false)
</script>