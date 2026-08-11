<script setup lang="ts">
import { productsCover } from "@/shared/composables/product.cover.ts";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store";

const { productsYear } = productsStore();
const { getProductId } = useProducts();
const { productPreview } = productsCover();
</script>

<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.id)" v-for="product in productsYear" :key="product.id" class="flex flex-col flex-shrink-0 lg:w-[380px] md:w-[280px] w-[200px]">
      <router-link :to="{name: 'products/info'}">
        <img :src="productPreview(product.id, productsYear)" alt="" :class="['w-full h-[200px] lg:h-[380px] md:h-[280px]',
              product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : '']">
      </router-link>
      <span class="whitespace-normal mt-2 text-[#A3A3A3]">
        {{ product.material }} {{ product.category }}
      </span>
      <div class="flex items-center justify-between font-medium text-base">
        <span class="whitespace-normal">{{ product.title }}</span>
        <span>$ {{ product.price }}</span>
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