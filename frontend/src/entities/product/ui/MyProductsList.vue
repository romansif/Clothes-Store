<template>
  <ul v-if="myProducts.length > 0" class="font-[Montserrat] flex flex-col overflow-y-auto gap-20 max-h-175 no-scrollbar">
    <MyProductItem />
  </ul>
  <div v-else class="flex pl-120 pt-65">
    <div class="flex flex-col gap-4 items-center">
      <span class="text-xl font-semibold">As of now, the new weekly releases have not yet appeared.</span>
      <span class="text-red-600 ">Or a glitch occurred: click to refresh.</span>
      <BaseButton name="Try again" variant="refresh" @click="getMyProducts" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from "@/shared/ui/BaseButton.vue";

const { myProducts } = productStore();
const { getMyProducts } = productApi();

import { productStore } from "@/entities/product/model/product.store.ts";
import { productApi } from "@/feature/use-product/api/product.api.ts";

import MyProductItem from "@/entities/product/ui/MyProductItem.vue";
</script>

<style scoped>

</style>