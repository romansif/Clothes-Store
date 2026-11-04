<template>
  <li>
    <div class="flex px-3 py-5">
      <div class="flex gap-5">
        <img
          v-if="product.images"
          :src="product.images[0]"
          alt=""
          class="h-39 w-30 rounded-2xl border border-gray-400 transition duration-400 hover:scale-110"
        />
        <div class="flex flex-col gap-5">
          <div class="flex flex-col gap-1">
            <span class="font-medium">{{ product.title }}</span>
            <span class="no-scrollbar max-h-30 w-170 overflow-y-auto break-all text-[#A3A3A3]">
              {{ product.description }}
            </span>
          </div>
          <div class="mt-auto flex items-center gap-6 text-sm">
            <div class="flex gap-1.5 rounded bg-[#F0F0F0] px-2.5 py-0.5">
              <span>Size:</span>
              <span class="font-medium">
                {{ product.size }}
              </span>
            </div>
            <div class="flex gap-1.5 rounded bg-[#F0F0F0] px-2.5 py-0.5">
              <span>Color:</span>
              <span class="font-medium">
                {{ product.color.colorName }}
              </span>
            </div>
            <div class="font-dm-sans ml-auto flex items-center gap-5">
              <span class="font-bold">$ {{ product.price }}</span>
              <span class="text-[#A3A3A3]">{{ product.quantity }} pcs.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <OrderItemActions :order="order" :item="product" />
  </li>
</template>

<script setup lang="ts">
import { OrderItemActions } from "@/entities/order-action";
import type { Order, OrderItem } from "@/entities/order";

const props = defineProps<{
  order: Order;
  product: OrderItem;
}>();
</script>
