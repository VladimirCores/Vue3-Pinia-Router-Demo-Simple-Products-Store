<script setup lang="ts">
import { computed } from "vue";
import Routes from "@/consts/Routes";
import type ProductVO from "@/model/vo/ProductVO";

const props = withDefaults(defineProps<{ product: ProductVO, isActive: boolean }>(), {
  isActive: true
});
const emit = defineEmits(['addProduct', 'removeProduct']);

const isAdded = computed(() => props.product.qty > 0);
const getTextAdd = computed(() => `Add${isAdded.value ? ` (${props.product.qty})` : ''}`);
const getLink = () => Routes.SELECTED_PRODUCT.path.replace(':id', props.product.id.toString());
const onAddClick = () => emit('addProduct', props.product);
const onRemoveClick = () => emit('removeProduct', props.product);
</script>
<template>
  <div class="grid grid-col grid-cols-1 content-between bg-gray-100 border-1 border-gray-200 rounded-xl overflow-hidden">
    <RouterLink :to="getLink()" class="grid-row grid-gap-3 p-1 [&>*]:pointer-events-none">
      <div class="w-full h-48 max-h-48 bg-white p-8 rounded-md">
        <img
          class="w-full h-full object-contain"
          :src="product.image"
          :alt="product.title"
        >
      </div>
      <div class="px-3">
        <div class="font-bold">{{ product.title }}</div>
        <div class="text-md text-black">${{ product.price }}</div>
        <p class="text-sm my-2">
          {{product.description.substring(0, 100)}}...
        </p>
      </div>
    </RouterLink>
    <div class="grid-row w-full px-3 pb-3">
      <div class="grid grid-col grid-gap-2 w-full ">
        <div v-if="isActive" class="flex flex-row">
          <ABtn v-if="isAdded" @click="onRemoveClick" class="text-xs flex-none mr-2" icon-only variant="light" color="danger"><i class="i-bx-trash"/></ABtn>
          <ABtn @click="onAddClick" class="grow text-xs w-full" variant="outline" color="success">{{ getTextAdd }}</ABtn>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>
