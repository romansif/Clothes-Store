<script setup lang="ts">
import { useOrderCard } from "@/shared/ui/orders/use.order.card.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useGetProducts } from "@/feature/products/composables/get-products.ts";

import copy_btn from '@/app/assets/icons/copy.svg';
import BaseButton from "@/shared/ui/button/BaseButton.vue";

const { orders } = productsStore();
const { getProductId } = useGetProducts();
const { productPreview, copyText } = useOrderCard();
</script>

<template>
  <TransitionGroup name="list">
    <li v-for="order in orders" :key="order.id" class="flex flex-col">
      <div class="flex bg-gray-50 p-3 border-b border-gray-300">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-4">
            <span class="text-xs px-2.5 py-1 rounded-md" :class="[
                  {
                    'bg-teal-50 text-teal-700 border border-teal-200 w-19.5' : order.status === 'Delivered',
                    'bg-sky-50 text-sky-700 border border-sky-200 w-18.5' : order.status === 'En route',
                     'bg-indigo-50 text-indigo-700 border border-indigo-200 w-18' : order.status === 'Convene',
                  }
              ]">
                {{ order.status }}
            </span>
            <div class="flex gap-2 items-center">
              <div class="group relative">
                <img @click="copyText(order.id.slice(0, 8))" :src="copy_btn" alt="" class="w-[20px]">
                <span class="transition duration-600 opacity-0 absolute group-hover:opacity-100 w-38 px-2 py-1 text-xs
                    bg-[rgba(0,0,0,0.8)] text-white rounded-xl">
                  Copy tracking number
                </span>
              </div>
              <span class="font-medium">№ {{ order.id.slice(0, 8) }}</span>
            </div>
          </div>
          <span class="text-xs text-[#A3A3A3]">Processed: {{ order.dateCreatedOrder }}, {{ order.timeCreatedOrder }}</span>
        </div>
        <div class="flex flex-col gap-2 ml-auto">
          <span class="text-[#A3A3A3]">Order total</span>
          <span class="font-bold ml-auto">$ {{ order.orderTotal }}</span>
        </div>
      </div>
      <div @click="getProductId(item.productId)" v-for="item in order.orderItems" :key="item.id">
        <router-link :to="{ name: 'products/info' }">
          <div class="flex py-5 px-3">
            <div class="flex gap-5">
              <img :src="productPreview(item.id)" alt="" class="w-[120px] rounded-2xl border border-gray-400 transition duration-400 hover:scale-110">
              <div class="flex flex-col mt-15 gap-5">
                <div class="flex flex-col gap-1">
                  <span class="font-medium">{{ item.title }}</span>
                  <span class="text-[#A3A3A3]">{{ item.description }}</span>
                </div>
                <div class="flex gap-6 text-sm">
                  <div class="px-2.5 py-0.5 bg-[#F0F0F0] rounded">
                    Size: <span>{{ item.size }}</span>
                  </div>
                  <div class="px-2.5 py-0.5 bg-[#F0F0F0] rounded">
                    <span>Color: <span class="font-medium">{{ item.color }}</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-2 ml-auto mt-15">
              <span class="font-medium">$ {{ item.price }}</span>
              <span class="text-[#A3A3A3] ml-auto">{{ item.quantity }} pcs.</span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="flex bg-gray-50 p-3 border-t border-gray-300">
        <BaseButton name="Repeat Order" variant="repeatOrder" />
      </div>
    </li>
  </TransitionGroup>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>