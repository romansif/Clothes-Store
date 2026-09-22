<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <BaseProductCard :array="cart" :product="product"
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
      <UseCart :product="product" :cart="cart" />
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type { Product } from "@/shared/model/product.types.ts";

defineProps<{
  product: Product;
  cart: Product[]
}>();

import BaseProductCard from "@/widgets/base/BaseProductCard.vue";
import UseCart from "@/features/use-cart/ui/UseCart.vue";

</script>


<style scoped>

</style>