<script setup lang="ts">
import { useProductsStore } from "@/stores/products";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import type { Ref } from "vue";
import Routes from "@/consts/Routes";
import { useRoute } from "vue-router";
import type { ColorProp } from "anu-vue/dist/types/composables/useProps";
const route = useRoute();
const productStore = useProductsStore();
const { card } = storeToRefs(productStore);
const getTextCard = computed(() => `Card (${card.value.length})`)
const getColorCard: Ref<ColorProp> = computed(() => isCardOpen.value ? 'success' : 'info')
const isCardOpen = computed(() => route.path !== Routes.CARD.path)
</script>
<template>
  <header class="grid-row grid-cols-2 sticky top-0 bg-gray-200 p-4 z-100">
    <div>{{ $route.name }}</div>
    <nav class="justify-self-end">
      <RouterLink :to="Routes.CARD.path">
        <ABtn
          :color="getColorCard"
          class="text-xs rounded-2xl"
          variant="light"
        >
          {{ getTextCard }}
        </ABtn>
      </RouterLink>
    </nav>
  </header>
</template>
