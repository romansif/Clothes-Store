<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex pl-10 gap-8">
      <BaseProductCard :product="product" :array="myProducts"
                       :size="'w-83.75 h-h-78.5m:h-[314px] xl:h-100'"
                       :stack-class="'absolute top-41 -left-12 text-7xl font-semibold -rotate-50 w-110'"
                       :favorite-btn="'absolute top-0.5 left-75.5 w-8 cursor-pointer'" />
      <div class="flex flex-col gap-35">
        <div class="flex flex-col gap-10">
          <UseMyProduct :product="product" />
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-gray-900 text-base sm:text-lg line-clamp-1">
              {{ product.title }}
            </h3>
            <div class="flex flex-wrap gap-4 text-xs">
              <span class="px-2 py-1 rounded-md bg-gray-100 transition duration-400 hover:scale-120 cursor-default">
                {{ product.category }}
              </span>
              <span class="px-2 py-1 rounded-md bg-gray-100 transition duration-400 hover:scale-120 cursor-default">
                {{ product.material }}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-gray-500 break-after-all leading-relaxed w-250 mt-2">
              {{ product.description }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-208">
          <span class="font-bold text-gray-900 text-base sm:text-lg font-dm-sans">
            $ {{ product.price }}
          </span>
          <BaseButton @click="toggleStackInfo(product)" name="Stack Info" variant="stackInfo"/>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { toggleStackInfo } from "@/features/use-my-product/lib/toggle-stack-info.ts";

defineProps<{
  product: Product
  myProducts: Product[]
}>();

import BaseButton from "@/shared/ui/BaseButton.vue";
import BaseProductCard from "@/widgets/ui/BaseProductCard.vue";
import type {Product} from "@/entities/product/model/product.types.ts";
import UseMyProduct from "@/features/use-my-product/ui/UseMyProduct.vue";
</script>

<style scoped>

</style>