<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.id)" v-for="product in myProducts" :key="product.id" class="flex pl-10 gap-8">
      <div class="flex flex-col">
        <div class="relative">
          <router-link :to="{ name: 'product/info' }">
            <img :src="productPreview(product.id, myProducts)" alt=""
                 :class="productPreviewClass('w-83.75 h-h-78.5m:h-[314px] xl:h-100', product)">
          </router-link>
          <span v-if="isOutOfStack(product)" class="absolute top-1/2 left-1/20 text-5xl font-semibold -rotate-45">
            Out Of Stack
          </span>
        </div>
      </div>
      <div class="flex flex-col gap-25">
        <div class="flex flex-col gap-20">
          <div class="flex items-center ml-auto gap-10">
            <router-link :to="{ name: 'edit/product' }">
              <img :src="pencil" alt="" class="w-7 transition duration-400 hover:scale-120 cursor-pointer">
            </router-link>
            <img @click="toggleDeleteChoice(
            'Are you sure you want to delete this product?', 'DELETE_PROUCT_ITEM', product.id
                 )" :src="del" alt="" class="w-7.5 transition duration-400 hover:scale-120 cursor-pointer">
          </div>
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
        <div class="border-t border-gray-100 flex items-center justify-between">
          <span class="font-bold text-gray-900 text-base sm:text-lg">
            $ {{ product.price }}
          </span>
          <span class="font-medium text-xs text-gray-400">
            In Stack: {{ product.quantity }} pcs.
          </span>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
const { getProductId } = productsApi();
const { myProducts } = productStore();
const { isOutOfStack, productPreview } = productsCover();
const { toggleDeleteChoice } = useProfileModals();
const { productPreviewClass } = baseClasses();

import { baseClasses } from "@/shared/constants/base.classes.ts";
import { productsApi } from "@/feature/products/api/products.api.ts";
import { productsCover } from "@/shared/lib/product-cover.ts";
import { productStore } from "@/feature/products/model/product.store.ts";
import { useProfileModals } from "@/feature/profile/lib/profile.modals.ts";

import del from '@/assets/icons/delete-close/delete.svg'
import pencil from "@/assets/icons/products/pencil.svg";
</script>

<style scoped>

</style>