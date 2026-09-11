<template>
  <TransitionGroup name="list">
    <li v-for="product in myProducts" :key="product.id" class="flex pl-10 gap-8">
      <div class="flex flex-col">
        <div class="relative">
          <router-link :to="{ name: 'product/info', params: { id: product.id } }">
            <img :src="productPreview(product.id, myProducts)" alt=""
                 :class="productPreviewClass('w-83.75 h-h-78.5m:h-[314px] xl:h-100', product)">
            <span v-if="isOutOfStack(product)" class="absolute top-45 -left-5 text-6xl font-semibold -rotate-50 w-90">
              Out Of Stack
            </span>
          </router-link>
        </div>
      </div>
      <div class="flex flex-col gap-25">
        <div class="flex flex-col gap-20">
          <div class="flex items-center ml-auto gap-10">
            <router-link :to="{ name: 'edit/product', params: { id: product.id } }">
              <img @click="getProduct(product.id)" :src="pencil" alt="" class="w-7 transition duration-400 hover:scale-120 cursor-pointer">
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
        <div class="flex items-center justify-between">
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
import { useGetMyProduct } from "@/features/use-my-product/api/get-my-product.ts";
import { baseClasses } from "@/shared/const/base.classes.ts";
import { toggleStackInfo } from "@/features/use-my-product/lib/toggle.my.product.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { productHelper } from "@/features/use-product/lib/product.helper.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile.modal.ts";

import del from '@/assets/icons/delete-close/delete.svg'
import pencil from "@/assets/icons/products/pencil.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";

const { getProduct } = useGetProduct();
const { myProducts } = useGetMyProduct();
const { productPreviewClass } = baseClasses();
const { toggleDeleteChoice } = useProfileModals();
const { isOutOfStack, productPreview } = productHelper();
</script>

<style scoped>

</style>