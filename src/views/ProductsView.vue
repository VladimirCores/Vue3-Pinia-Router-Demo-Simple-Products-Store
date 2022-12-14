<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProductsStore } from "@/stores/products";
import ProductItem from "@/components/ProductItem.vue";
import ProductVO from "@/model/vo/ProductVO";
import PageSpinner from "@/components/PageSpinner.vue";
const productStore = useProductsStore();
const { list: products, isLoading } = storeToRefs(productStore);
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
  <main class="grid grid-cols-4 grid-gap-3 pt-2">
    <ProductItem
      v-for="vo in products" :key="vo.id"
      :product="vo"
      is-active
      class="mb-4"
      @remove-product="onRemoveProduct"
      @add-product="onAddProduct"
    />
  </main>
</template>
