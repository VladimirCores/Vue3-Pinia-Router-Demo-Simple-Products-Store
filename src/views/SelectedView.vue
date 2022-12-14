<script setup lang="ts">
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import PageSpinner from "@/components/PageSpinner.vue";
import { storeToRefs } from "pinia";
import BackButton from "@/components/BackButton.vue";
const { params: { id } } = useRoute();
const productsStore = useProductsStore();
const { isLoading, selected: product } = storeToRefs(productsStore);
console.log('> SelectedView -> setup =', product);
productsStore.loadProductById(parseInt(id));
</script>
<template>
  <PageSpinner v-if="isLoading"/>
  <main v-else>
    <BackButton />
    <h1 class="text-xl">{{ product.title }}</h1>
    <h2 class="text-lg">${{ product.price }}</h2>
    <h3 class="text-sm">{{ product.description }}</h3>
    <div v-if="product.qty > 0">
      <p>Added: {{ product.qty }}</p>
      <p>Price: ${{ product.qty * product.price }}</p>
    </div>
    <img v-bind:src="product.image"/>
  </main>
</template>
<style>
</style>
