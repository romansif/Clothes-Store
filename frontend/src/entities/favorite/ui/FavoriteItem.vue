<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <BaseProductCard :product="product" :array="favorite"
                         :size="'w-83.75 h-45 sm:h-78.5 xl:h-100'"
                         :stack-class="'absolute top-41 -left-12 text-7xl font-semibold -rotate-50 w-110'"
                         :favorite-btn="'absolute top-0.5 left-75.5 w-8 cursor-pointer'" />
        <span class="whitespace-normal mt-2 text-[#A3A3A3] text-sm sm:text-lg">
          {{ product.material }} {{ product.category }}
        </span>
        <div class="flex justify-between items-center font-medium text-sm sm:text-lg">
          <span class="whitespace-normal">
            {{ product.title }}
          </span>
          <span class="font-dm-sans">
            $ {{ product.price }}
          </span>
        </div>
      </div>
      <div class="flex flex-col w-7.5 gap-5">
        <img :src="update" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type {Product} from "@/entities/product/model/product.types.ts";

defineProps<{
  product: Product
  favorite: Product[]
}>();

import update from "@/assets/icons/products/refresh.svg";
import BaseProductCard from "@/widgets/ui/BaseProductCard.vue";
</script>

<style scoped>

</style>