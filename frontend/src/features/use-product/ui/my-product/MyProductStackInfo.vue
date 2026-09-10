<template>
  <div @click="toggleStackInfo(product)" class="font-raleway fixed inset-0 z-50
     bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
    <div @click.stop class="flex flex-col gap-8 bg-white rounded-xl p-5 w-fit">
      <div class="flex items-center ">
        <h1 class="text-2xl font-medium">Quantity of each item</h1>
        <img @click="toggleStackInfo(product)" :src="close" alt="" class="w-6.5 ml-auto cursor-pointer" />
      </div>
      <div class="grid grid-cols-6 gap-3">
        <div v-for="variant in product.variants" :key="variant.hex + variant.size"
             class="flex items-center gap-2 px-3 py-4 rounded-lg
              bg-white border border-gray-200
              hover:border-gray-400 hover:shadow-sm
              transition-all duration-200 cursor-default">
          <span class="w-6 h-6 rounded-full border-2 border-gray-200 shadow-sm"
                :style="{ backgroundColor: variant.hex }"></span>
          <span class="text-xs text-center leading-tight font-bold">{{ variant.colorName }}</span>
          <span class="text-xs font-bold leading-tight">{{ variant.size }}</span>
          <span class="text-xs font-bold leading-tight">{{ variant.count }} pcs.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useProductsModals } from "@/features/use-product/lib/product.modal.ts";

import close from "@/assets/icons/delete-close/delete.svg";

const { product } = useGetProduct();
const { toggleStackInfo } = useProductsModals();
</script>

<style scoped>

</style>