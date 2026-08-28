<template>
  <TransitionGroup name="list" mode="out-in">
    <li v-for="order in orders" :key="order.id" class="flex flex-col">
      <div class="flex bg-gray-50 p-3 border-b border-gray-300">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <span class="text-xs px-2.5 py-1 rounded-md" :class="orderStatus(order)">
                {{ order.status }}
            </span>
            <div class="flex gap-2 items-center">
              <div class="group relative">
                <img @click="copyText(order.id.slice(0, 8))" :src="copy_btn" alt="" class="w-5">
                <span class="transition duration-600 opacity-0 absolute group-hover:opacity-100 w-38 px-2 py-1 text-xs
                    bg-[rgba(0,0,0,0.8)] text-white rounded-xl">
                  Copy tracking number
                </span>
              </div>
              <span class="font-medium font-dm-sans">№ {{ order.id.slice(0, 8) }}</span>
            </div>
          </div>
          <OrderStatus :order="order" />
        </div>
        <div class="flex flex-col gap-2 ml-auto">
          <span class="text-[#A3A3A3] ml-auto">Order total</span>
          <span class="font-bold ml-auto font-dm-sans">$ {{ order.orderTotal }}</span>
          <span class="text-[#A3A3A3] font-normal ml-auto">{{ order.delivery }}</span>
        </div>
      </div>
      <div v-for="item in order.orderItems" :key="item.id"  @click="getProductId(item.productId)">
        <router-link :to="{ name: 'product/info', params: { id: order.productId } }">
          <div class="flex py-5 px-3">
            <div class="flex gap-5">
              <img :src="orderPreview(item.id, 'ADDED')" alt="" class="w-30 h-39 rounded-2xl border border-gray-400
                  transition duration-400 hover:scale-110">
              <div class="flex flex-col gap-5">
                <div class="flex flex-col gap-1">
                  <span class="font-medium">{{ item.title }}</span>
                  <span class="text-[#A3A3A3] break-all w-170 overflow-y-auto max-h-30 no-scrollbar">
                    {{ item.description }}
                  </span>
                </div>
                <div class="flex gap-6 text-sm items-center mt-auto">
                  <div class="flex gap-1.5 px-2.5 py-0.5 bg-[#F0F0F0] rounded">
                    <span>Size:</span>
                    <span class="font-medium">
                      {{ item.sizes }}
                    </span>
                  </div>
                  <div class="flex gap-1.5 px-2.5 py-0.5 bg-[#F0F0F0] rounded">
                    <span>Color:</span>
                    <span class="font-medium">
                      {{ pureColorsName(item) }}
                    </span>
                  </div>
                  <div class="flex gap-5 ml-auto">
                    <span class="font-bold font-dm-sans">$ {{ item.price }}</span>
                    <span class="text-[#A3A3A3]">{{ item.quantity }} pcs.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="flex justify-end gap-8 p-3 border-t bg-gray-50 border-gray-300">
        <BaseButton name="Repeat Order" variant="repeatOrder" />
        <BaseButton v-if="order.status !== 'Cancelled'" variant="repeatOrder" name="Cancel Order" @click="toggleOrder(order.id)" />
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
const { orders } = orderStore();
const { copyText } = useOrder();
const { getProductId } = productApi();
const { toggleOrder } = useBaseModals();
const { orderStatus } = ordersClasses();
const { orderPreview, pureColorsName } = productsCover();

import { useOrder } from "@/features/use-order/model/use-order.ts";
import { orderStore } from "@/entities/order/model/order.store.ts";
import { productApi } from "@/features/use-product/api/product.api.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { productsCover } from "@/features/use-product/model/use-product.ts";
import { ordersClasses } from "@/shared/const/product/orders.classes.ts";

import copy_btn from '@/assets/icons/squares/copy.svg';
import BaseButton from "@/shared/ui/BaseButton.vue";
import OrderStatus from "@/entities/order/ui/OrderStatus.vue";
</script>

<style scoped>

</style>