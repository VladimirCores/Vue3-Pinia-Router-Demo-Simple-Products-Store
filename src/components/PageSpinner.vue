<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  size?: number,
  width?: number,
  opacity?: number,
  color?: string
  spinner?: string
}>(), {
  size: 75,
  width: 2,
  opacity: 35,
  color: 'white',
  spinner: 'grey'
});
const cssSize = computed(() => props.size + 'px')
const cssWidth = computed(() => props.width + 'px')
const classBackground = computed(() => `bg-gray-500/${props.opacity}`)
</script>
<template>
<div class="fixed left-0 w-screen h-screen z-1000 flex justify-center items-center" :class="classBackground">
  <div class="spinner-shape"></div>
</div>
</template>
<style scoped>
@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
.spinner-shape {
  display: inline-block;
  width: v-bind(cssSize);
  height: v-bind(cssSize);
  border: v-bind(cssWidth) solid v-bind(color);
  border-radius: 50%;
  border-top-color: v-bind(spinner);
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}
</style>