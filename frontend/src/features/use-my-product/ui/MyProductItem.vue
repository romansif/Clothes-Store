<template>
  <TransitionGroup name="list">
    <li :key="product.id" class="flex pl-10 gap-8">
      <BaseProductCard :product="product" :array="myProducts"
                       :size="'w-83.75 h-h-78.5m:h-[314px] xl:h-100'"
                       :stack-class="'absolute top-41 -left-12 text-7xl font-semibold -rotate-50 w-110'"
                       :favorite-btn="'absolute top-0.5 left-75.5 w-8 cursor-pointer'" />
      <div class="flex flex-col">
        <div class="flex flex-col gap-10">
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
        <div class="fixed top-110 flex items-center gap-208">
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
import { toggleStackInfo } from "@/features/use-my-product/lib/toggle.my.product.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile.modal.ts";

defineProps<{
  product: Product
  myProducts: Product[]
}>();

import del from '@/assets/icons/delete-close/delete.svg'
import pencil from "@/assets/icons/products/pencil.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import BaseProductCard from "@/widgets/ui/BaseProductCard.vue";
import type {Product} from "@/features/use-product/model/product.types.ts";

const { getProduct } = useGetProduct();
const { toggleDeleteChoice } = useProfileModals();
</script>

<style scoped>

</style>