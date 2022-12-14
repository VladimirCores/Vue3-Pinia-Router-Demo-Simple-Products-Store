<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import type { Ref } from "vue";
import type { ColorProp } from "anu-vue/dist/types/composables/useProps";

import Routes from "@/consts/Routes";
import { useProductsStore } from "@/stores/products";

const route = useRoute();
const productStore = useProductsStore();
const { numberOfSelectedProducts, totalPrice } = storeToRefs(productStore);
const getTextCard = computed(() => `Card (${numberOfSelectedProducts.value})`)
const getColorCard: Ref<ColorProp> = computed(() => isCardOpen.value ? 'info' : 'success')
const isCardOpen = computed(() => route.path === Routes.CARD.path)
</script>
<template>
  <header class="grid grid-row grid-cols-2 sticky top-0 bg-gray-300/75 text-black-50 rounded-b-md px-4 py-3 z-100 items-center place-items-start">
    <div class="text-xl">{{ $route.name }}</div>
    <nav class="justify-self-end w-full">
      <div class="grid-row grid-cols-2 place-items-end">
        <div class="lg:text-xl font-bold">
          Total: ${{ Math.ceil(totalPrice) }}
        </div>
        <RouterLink :to="Routes.CARD.path">
          <ABtn
            :color="getColorCard"
            class="text-xs rounded-2xl"
            variant="fill"
          >
            {{ getTextCard }}
          </ABtn>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
