<template>
  <div v-if="myProducts.length === 0" class="flex justify-center pt-80">
    <div class="flex flex-col items-center gap-5">
      <img :src="icon_products" alt="">
      <div class="flex flex-col gap-2 items-center">
        <span class="font-bold">You haven't created any product cards</span>
        <span class="text-[#A3A3A3]">It’s the perfect time to start building your own business.</span>
        <span class="text-[#A3A3A3]">To do this, go to your useProfile and tap "CREATE PRODUCT COVER".</span>
      </div>
    </div>
  </div>
  <main v-else class="flex mt-10">
    <MyProductsList />
  </main>
</template>

<script setup lang="ts">
import { useGetProduct } from "@/features/use-product/api/get-product.ts";

import icon_products from "@/assets/icons/products/icon-products.svg";
import MyProductsList from "@/features/use-product/ui/my-product/MyProductsList.vue";

const { myProducts } = useGetProduct();
</script>

<style scoped>

</style>