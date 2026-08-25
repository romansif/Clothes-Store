<template>
  <TransitionGroup name="list">
    <li @click="getProductId(product.productId)" v-for="product in items" :key="product?.id"
        class="flex justify-between gap-3 w-full">
      <div class="flex items-center gap-3 font-medium text-xs">
        <router-link :to="{name: 'product/info'}">
          <img :src="orderPreview(product?.id, 'ADD')" alt="" class="w-28.25 cursor-pointer">
        </router-link>
        <div class="flex flex-col gap-3 mt-3">
          <div class="flex gap-25">
            <div class="flex flex-col gap-1 w-22">
              <span class="">{{ product?.title }}</span>
              <span>{{ product?.category }}</span>
            </div>
            <span class="">$ {{ product?.price }}</span>
          </div>
          <span class="text-gray-400">{{ pureColorsName(product) }} / {{ product?.sizes }}</span>
          <span class="mt-8">(<span class="text-blue-700 font-medium">{{ product?.quantity }}</span>)</span>
        </div>
      </div>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">

const { items } = orderStore();
const { getProductId } = productApi();
const { orderPreview, pureColorsName } = productsCover();

import { orderStore } from "@/entities/order/model/order.store.ts";
import { productApi } from "@/feature/use-product/api/product.api.ts";
import { productsCover } from "@/feature/use-product/model/product-cover.ts";
</script>

<style scoped>

</style>