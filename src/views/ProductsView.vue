<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/products";

import ProductItem from "@/components/ProductItem.vue";
import PageSpinner from "@/components/PageSpinner.vue";

import type ProductVO from "@/model/vo/ProductVO";

const productStore = useProductsStore();
const { list: products, isLoading }: any = storeToRefs(productStore);
const onAddProduct = (product: ProductVO) => {
  productStore.addProduct(product);
}
const onRemoveProduct = (product: ProductVO) => {
  productStore.removeProduct(product);
}
productStore.loadProducts();
</script>
<template>
  <PageSpinner v-if="isLoading"/>
  <main v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-gap-3 pt-4">
    <ProductItem
      v-for="vo in products" :key="vo.id"
      :product="vo"
      is-active
      @remove-product="onRemoveProduct"
      @add-product="onAddProduct"
    />
  </main>
</template>
