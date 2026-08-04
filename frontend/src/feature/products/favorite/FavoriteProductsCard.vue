<script setup lang="ts">
import { productsCover } from "@/shared/composables/product.cover.ts";
import { useProducts } from "@/feature/products/composables/use.products.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useFavorites } from "@/feature/products/composables/use.favorites.ts";
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";

import del from "@/app/assets/icons/delete-close/delete.svg";
import like from "@/app/assets/icons/nav/like.png";
import update from "@/app/assets/icons/products/refresh.svg";
import liked from "@/app/assets/icons/nav/liked.png";

const { favorite } = productsStore();
const { getProductId } = useProducts();
const { productPreview } = productsCover();
const { toggleToFavorite } = useFavorites();
const { toggleDeleteChoice } = useProfileModals();

const refreshPage = () => {
  window.location.reload();
}
</script>

<template>
  <TransitionGroup name="list">
    <li v-for="product in favorite" :key="product.id" class="flex gap-5">
      <div class="flex flex-col">
        <div @click="getProductId(product.id)" class="relative">
          <router-link :to="{ name: 'products/info' }">
            <img :src="productPreview(product.id, favorite)" alt="" :class="['w-[335px] h-[180px] sm:h-[314px] xl:h-[400px]',
                product.quantity === 0 || product.status === 'Exhausted' ? 'opacity-40' : '']">
          </router-link>
          <span v-if="product.quantity === 0 || product.status === 'Exhausted'" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">
            Out Of Stack
          </span>
          <img @click="toggleToFavorite(product.productId, 'favorite', product.productId)" :src="product.favorite ? liked : like"
               alt="" class="absolute top-0.5 left-75.5 w-[32px] cursor-pointer">
        </div>
        <span class="whitespace-normal mt-2 text-[#A3A3A3] text-sm sm:text-lg">
          {{ product.material }} {{ product.category }}
        </span>
        <div class="flex justify-between items-center font-medium text-sm sm:text-lg">
          <span class="whitespace-normal">
            {{ product.title }}
          </span>
          <span>
            $ {{ product.price }}
          </span>
        </div>
      </div>
      <div class="flex flex-col w-[30px] gap-5">
        <img @click="toggleDeleteChoice(
            'Are you sure you want to delete this favorite product?', 'DELETE_FAVORITE_ITEM', product.productId)"
             :src="del" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
        <img @click="refreshPage()" :src="update" alt="" class="transition duration-400 hover:scale-120 cursor-pointer">
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