<script setup lang="ts">
import { useOrderCard } from "@/shared/ui/orders/use.order.card.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useGetProducts } from "@/feature/products/composables/get.products.ts";

const { items } = productsStore();
const { getProductId } = useGetProducts();
const { productPreview } = useOrderCard();
</script>

<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.productId)" v-for="product in items" :key="product?.id" class="flex justify-between gap-3 w-full">
      <div class="flex items-center gap-3 font-medium text-xs">
        <router-link :to="{name: 'products/info'}">
          <img :src="productPreview(product?.id)" alt="" class="w-[113px] cursor-pointer">
        </router-link>
        <div class="flex flex-col gap-3 mt-3">
          <div class="flex items-center gap-35">
            <span class="">{{ product?.title }} {{ product?.category }}</span>
            <span class="">$ {{product?.price }}</span>
          </div>
          <span class="text-gray-400">{{ product?.color }}/{{ product?.size }}</span>
          <span class="mt-8">(<span class="text-blue-700 font-medium">{{ product?.quantity }}</span>)</span>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>