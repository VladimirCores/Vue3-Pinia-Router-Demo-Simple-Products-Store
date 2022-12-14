<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useProductsStore } from "@/stores/products";

import PageSpinner from "@/components/PageSpinner.vue";
import BackButton from "@/components/BackButton.vue";

const { params: { id } }: any = useRoute();
const productsStore = useProductsStore();
const { isLoading, selected: product }: any = storeToRefs(productsStore);
console.log('> SelectedView -> setup =', product);
const isAdded = computed(() => product.value.qty > 0);

productsStore.loadProductById(parseInt(id as string));

const onAddProduct = () => productsStore.addProduct(product.value);
const onRemoveProduct = () => productsStore.removeProduct(product.value);

</script>
<template>
  <PageSpinner v-if="isLoading"/>
  <main v-else class="grid grid-col">
    <div class="py-2">
      <BackButton />
    </div>
    <div class="grid grid-row sm:grid-cols-2">
      <div class="grid grid-col grid-gap-3">
        <h1 class="text-xl">{{ product.title }}</h1>
        <h2 class="text-lg font-bold">${{ product.price }}</h2>
        <h3 class="text-sm">{{ product.description }}</h3>
        <div class="grid grid-row grid-cols-3">
          <div class="text-md font-bold" v-if="isAdded">
            <p>In card: {{ product.qty }}</p>
          </div>
          <ABtn v-if="isAdded" @click="onRemoveProduct" class="text-xs flex-none mr-2 justify-self-end" icon-only variant="light" color="danger"><i class="i-bx-trash"/></ABtn>
          <ABtn @click="onAddProduct" class="grow text-xs w-full" variant="outline" color="success">Add</ABtn>
        </div>
      </div>
      <div class="grid-col w-full h-24">
        <img v-bind:src="product.image"/>
      </div>
    </div>
  </main>
</template>
<style>
</style>
