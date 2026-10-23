<template>
  <TransitionGroup name="list">
    <li class="flex flex-col">
      <div class="flex bg-gray-50 p-3 border-b border-gray-300">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <span :class="orderStatus(order)">
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
      <ProductOrderItem v-for="item in order.orderItems"
                        :key="order.id"
                        :order="order"
                        :product="item" />
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useOrder } from "@/entities/order-item/lib/use-order";
import { ordersVariants } from "@/entities/order-item/model/orders.variants";
import { OrderStatus } from "@/entities/order";
import type { Order } from "@/entities/order";

defineProps<{
  order: Order
}>();

import copy_btn from '@/assets/icons/squares/copy.svg';
import ProductOrderItem from "@/entities/order-item/ui/ProductOrderItem.vue";

const { copyText } = useOrder();
const { orderStatus } = ordersVariants();
</script>