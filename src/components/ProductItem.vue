<script setup lang="ts">
import type ProductVO from "@/model/vo/ProductVO";
import { computed } from "vue";
import Routes from "@/consts/Routes";

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
  <ACard
    :title="product.title"
    :subtitle="product.price"
    variant="light"
  >
    <img
      class="w-full max-h-32 object-contain pb-5"
      :src="product.image"
      :alt="product.title"
    >
    <div class="a-card-body a-card-spacer bg-gray-100 h-full">
      <p class="text-sm">
        {{product.description.substring(0, 100)}}
      </p>
      <div v-if="isActive" class="grid-row grid-gap-1 pt-2" :class="{ 'grid-cols-3': isAdded }">
        <ABtn @click="onRemoveClick" class="text-xs" icon-only variant="light" v-if="isAdded" color="danger"><i class="i-bx-trash"/></ABtn>
        <ABtn @click="onAddClick" class="text-xs w-full col-span-2" variant="light" color="success">{{ getTextAdd }}</ABtn>
      </div>
      <RouterLink :to="getLink()">
        <ABtn class="text-xs w-full" variant="light" color="info">
          Open
        </ABtn>
      </RouterLink>
    </div>
  </ACard>
</template>

<style scoped>
</style>
