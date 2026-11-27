<template>
  <li class="flex w-full justify-between gap-3">
    <div class="flex items-center gap-3 text-xs font-medium">
      <router-link :to="{ name: 'product/info', params: { id: getProductId(props.product) } }">
        <img :src="preview" alt="" class="w-28.25 cursor-pointer" />
      </router-link>
      <div class="mt-3 flex flex-col gap-3">
        <div class="flex gap-25">
          <div class="flex w-22 flex-col gap-1">
            <span class="">{{ props.product?.title }}</span>
            <span>{{ props.product?.category }}</span>
          </div>
          <span class="font-dm-sans">$ {{ linePrice }}</span>
        </div>
        <span class="text-gray-400">{{ item?.color?.colorName }} / {{ item?.size }}</span>
        <span class="mt-8">
          (<span class="font-dm-sans font-medium text-blue-700">{{ item.quantity }}</span
          >)
        </span>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useCheckoutOrder } from "@/entities/checkout-order-item";
import { previewHelper } from "@/shared/ui/product-card";
import type { CartItem } from "@/shared/model";

const props = defineProps<{
  product: CartItem;
  checkoutItems: CartItem[];
}>();

const { getProductId } = previewHelper();
const { item, preview, linePrice } = useCheckoutOrder(props.product, props.checkoutItems);
</script>
