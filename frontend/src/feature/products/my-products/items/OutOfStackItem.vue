<script setup lang="ts">
import { productsCover } from "@/shared/composables/product.cover.ts";
import { productsStore } from "@/shared/composables/stores/products.store";
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { useFavorites } from "@/feature/products/composables/use.favorites.ts";

import del from '@/app/assets/icons/delete-close/delete.svg';
import like from '@/app/assets/icons/nav/like.png';
import pencil from '@/app/assets/icons/products/pencil.svg';
import liked from '@/app/assets/icons/nav/liked.png';

const { productPreview } = productsCover();
const { getProductId } = useProducts();
const { stack, outOfStack } = productsStore();
const { toggleToFavorite } = useFavorites()
const { toggleDeleteChoice } = useProfileModals();
</script>

<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.productId)" v-for="product in outOfStack" :key="product.id" class="flex gap-10 pr-25 pl-15">
      <div class="flex flex-col">
        <div class="relative">
          <router-link :to="{ name: 'products/info' }">
            <img :src="productPreview(product.id, outOfStack)" alt="" :class="['w-[335px] h-[314px] sm:h-[314px] xl:h-[400px]',
                product.status === 'Availability' ? '' : 'opacity-40']">
          </router-link>
          <span v-if="product.status === 'Exhausted'" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">Out Of Stack</span>
          <img @click="toggleToFavorite(product.id, 'cart', product.productId)" :src="product.favorite ? liked : like"
               alt="" :class="['absolute top-0.5 left-74.5 w-[32px]', stack.length > 0 ? '' : 'left-75.5']">
        </div>
      </div>
      <div class="flex flex-col gap-25">
        <div class="flex flex-col gap-20">
          <div class="flex items-center">
            <img :src="pencil" alt="" class="w-[28px] transition duration-400 hover:scale-120 cursor-pointer">
            <img @click="toggleDeleteChoice(
            'Are you sure you want to delete this product?', 'DELETE_PROUCT_ITEM', product.id
                 )" :src="del" alt="" class="w-[30px] transition duration-400 hover:scale-120 cursor-pointer ml-auto">
          </div>
          <div class="flex flex-col gap-4">
            <h3 class="font-semibold text-gray-900 text-base sm:text-lg line-clamp-1">
              {{ product.title }}
            </h3>
            <div class="flex flex-wrap gap-4 text-xs">
              <span class="px-2 py-1 rounded-md bg-gray-100 transition duration-400 hover:scale-120 cursor-default">{{ product.category }}</span>
              <span class="px-2 py-1 rounded-md bg-gray-100 transition duration-400 hover:scale-120 cursor-default">{{ product.material }}</span>
            </div>
            <p class="text-xs sm:text-sm text-gray-500 break-after-all leading-relaxed w-54 mt-2">
              {{ product.description }}
            </p>
          </div>
        </div>
        <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span class="font-bold text-gray-900 text-base sm:text-lg">
              $ {{ product.price }}
            </span>
          <span class="text-xs text-gray-400">
              In Stack: {{ product.quantity }} pcs.
            </span>
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