<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/AppHeader.vue";
</script>
<template>
  <AppHeader />
  <RouterView v-slot="{ Component }">
    <keep-alive exclude="SelectedView">
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>
<style scoped>
</style>
