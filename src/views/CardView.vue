<script setup lang="ts">
import { useProductsStore } from "@/stores/products";
import { storeToRefs } from "pinia";
import ProductItem from "@/components/ProductItem.vue";
import BackButton from "@/components/BackButton.vue";
const productsStore = useProductsStore();
const { card, totalPrice }: any = storeToRefs(productsStore);
console.log('> CardView -> setup =', card);
</script>
<template>
  <main>
    <div class="grid-row grid-cols-2">
      <BackButton />
      <div class="justify-self-end">
        Total: ${{ totalPrice }}
      </div>
    </div>
    <ProductItem
      v-for="vo in card" :key="vo.id"
      :product="vo"
      class="mb-4"
      :is-active="false"
    />
  </main>
</template>
<style>
</style>
