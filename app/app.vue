<template>
  <div>
      <NuxtLayout :name="layout">
        <NuxtLoadingIndicator :throttle="0" color="red" text="Loading..." />
        <NuxtPage />
      </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { flexible } from './assets/js/flexible';
import type { LayoutKey } from '#build/types/layouts';
import { NuxtLayout, NuxtPage } from '#components';

//const layout = 'default';
  const layout = ref<false | LayoutKey>('default');
// function changeLayout() {
//   layout.value = layout.value === 'default'? 'custom' : 'default';
// }
onMounted(() => {
  flexible(window, document);
});

</script>
<style scoped lang="scss">
  // body { overflow-x: hidden; }
</style>