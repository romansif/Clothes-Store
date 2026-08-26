<template>
  <Transition name="view">
    <div v-if="newCollections.length === 0" class="flex justify-center pt-45">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">At of now, new collections have not yet appeared</span>
      </div>
    </div>
    <ul v-else class="font-raleway grid grid-cols-2 gap-5 overflow-y-auto max-h-132.5
       sm:max-h-197.5 sm:grid-cols-2 no-scrollbar sm:gap-8 md:gap-10 md:max-h-200 lg:grid-cols-4 xl:max-h-116 mt-5 xl:mt-0">
      <NewCollectionItem />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
const { newCollections } = productStore();

import { productStore } from "@/entities/product/model/product.store.ts";

import NewCollectionItem from "@/entities/product/ui/NewCollectionItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";
</script>

<style scoped>

</style>