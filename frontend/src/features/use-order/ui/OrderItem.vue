<template>
  <TransitionGroup name="list">
    <li :key="order.id" class="flex flex-col">
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
      <div v-for="item in order.orderItems" :key="item.id">
        <router-link :to="{ name: 'product/info', params: { id: getProductId(item) } }">
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
                    <span class="text-[#A3A3A3]">{{ orderQuantity(item) }} pcs.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </router-link>
        <div class="flex justify-end gap-8 bg-gray-50 border-gray-300 border-t p-3">
          <BaseButton v-if="isInReview" @click="toggleReviewChoice(item.productId)" name="Write a review" variant="useOrder" />
          <BaseButton v-if="order.status !== 'Cancelled'" name="Cancel Order"
                      variant="useOrder"
                      @click="toggleReplaceChoice(order.id)" />
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useOrder } from "@/features/use-order/lib/use-order.ts";
import { orderPreview } from "@/features/use-checkout-order/lib/checkout-order-helper.ts";
import { productHelper } from "@/shared/lib/helper/product-helper.ts";
import { toggleReplaceChoice } from "@/features/use-order/lib/order-modal.ts";
import { toggleReviewChoice } from "@/features/use-review-form/lib/review-modal.ts";
import { ordersClasses } from "@/shared/const/order/orders.classes.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import type { Order } from "@/features/use-order/model/order.types.ts";
import { isInReview } from "@/features/use-review-form/lib/add-rating-star.ts";

defineProps<{
  order: Order
}>();

import copy_btn from '@/assets/icons/squares/copy.svg';
import BaseButton from "@/shared/ui/BaseButton.vue";
import OrderStatus from "@/features/use-order/ui/OrderStatus.vue";

const { orderStatus } = ordersClasses();
const { getProductId } = useGetProduct();
const { pureColorsName } = productHelper();
const { copyText, orderQuantity } = useOrder();
</script>

<style scoped>

</style>