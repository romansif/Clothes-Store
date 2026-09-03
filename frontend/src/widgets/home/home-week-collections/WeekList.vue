<template>
  <Transition name="view">
    <div v-if="productsWeek.length === 0" class="flex justify-center pt-20">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">At of now, week collection have not yet appeared</span>
      </div>
    </div>
    <ul v-else v-horizontal-scroll class="flex gap-10 xl:gap-22.5 overflow-x-auto whitespace-nowrap no-scrollbar pt-6">
      <WeekItem />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
const { productsWeek } = productStore();
const { vHorizontalScroll } = productsCover();

import { productStore } from "@/entities/product/model/product.store.ts";
import { productsCover } from "@/features/use-product/model/use-product.ts";

import WeekItem from "@/widgets/home/home-week-collections/WeekItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";
</script>

<style scoped>

</style>