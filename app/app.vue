<script setup lang="ts">
import type { LayoutKey } from '#build/types/layouts';
import { NuxtLayout, NuxtPage } from '#components';

//const layout = 'default';
  const layout = ref<false | LayoutKey>('default');
// function changeLayout() {
//   layout.value = layout.value === 'default'? 'custom' : 'default';
// }

</script>

<template>
  <!-- <button @click="changeLayout">改变布局</button> -->
  <div>
      <NuxtLayout :name="layout">
        <NuxtPage />
      </NuxtLayout>
  </div>
</template>

<style>
  body { overflow-x: hidden; }
</style>