<script setup lang="ts">
import { useProductsStore } from "@/stores/products";
import { storeToRefs } from "pinia";

import ProductItem from "@/components/ProductItem.vue";
import BackButton from "@/components/BackButton.vue";

import type ProductVO from "@/model/vo/ProductVO";

const productsStore = useProductsStore();
const { selectedProducts: card }: any = storeToRefs(productsStore);
const onAddProduct = (product: ProductVO) => productsStore.addProduct(product);
const onRemoveProduct = (product: ProductVO) => productsStore.removeProduct(product);

console.log('> CardView -> setup =', card);

</script>
<template>
  <main>
    <div class="grid-row grid-cols-2 p-2">
      <BackButton />
    </div>
    <div >
      <div v-for="vo in card" :key="vo.id"
        class="grid sm:grid-cols-2 items-center grid-gap-3 mb-2 bg-gray-50 p-2 border-1 border-gray-100 rounded-b-xl">
        <ProductItem :product="vo" :is-active="false"/>
        <div class="w-full grid-col grid-gap-3">
          <div class="grid-row grid-cols-5 w-full">
            <div class="text-lg justify-self-end">Qty: {{ vo.qty }}</div>
            <div class="text-lg col-span-2 justify-self-center">Result: ${{ vo.qty * vo.price }}</div>
            <ABtn @click="onAddProduct(vo)" class="text-xs w-full" variant="light" color="success">Add</ABtn>
            <ABtn @click="onRemoveProduct(vo)" class="text-xs" icon-only variant="light" v-if="vo.qty > 0" color="danger"><i class="i-bx-trash"/></ABtn>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style>
</style>
