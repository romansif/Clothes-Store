<template>
  <TransitionGroup name="list">
    <li :key="product?.id" class="flex justify-between gap-3 w-full">
      <div class="flex items-center gap-3 font-medium text-xs">
        <router-link :to="{ name: 'product/info', params: { id: getProductId(product) } }">
          <img :src="orderPreview(product?.id, 'ADD')" alt="" class="w-28.25 cursor-pointer">
        </router-link>
        <div class="flex flex-col gap-3 mt-3">
          <div class="flex gap-25">
            <div class="flex flex-col gap-1 w-22">
              <span class="">{{ product?.title }}</span>
              <span>{{ product?.category }}</span>
            </div>
            <span class="font-dm-sans">$ {{ product?.price }}</span>
          </div>
          <span class="text-gray-400">{{ pureColorsName(product) }} / {{ product?.sizes }}</span>
          <span class="mt-8">
            (<span class="text-blue-700 font-medium font-dm-sans">{{pureQuantity(product.id, items)?.count }}</span>)
          </span>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import type { OrderItem } from "@/entities/order/model/order.types.ts";
import { useGetProduct } from "@/features/use-product/api/get-product.ts";
import { productHelper } from "@/shared/lib/helper/product-helper.ts";
import { orderPreview } from "@/features/use-checkout-order/lib/checkout-order-helper.ts";
import type {Product} from "@/shared/model/product.types.ts";

defineProps<{
  product: Product
  items: OrderItem[];
}>()

const { getProductId } = useGetProduct();
const { pureQuantity, pureColorsName } = productHelper();
</script>

<style scoped>

</style>