<template>
  <Transition name="view">
    <div v-if="myProducts.length === 0" class="flex ml-145 pt-75">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">You haven't created something product cover</span>
      </div>
    </div>
    <ul v-else class="font-raleway flex flex-col gap-20">
      <MyProductItem v-for="product in myProducts" :product="product" :myProducts="myProducts" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetMyProduct } from "@/features/use-my-product/api/get-my-product.ts";

import MyProductItem from "@/features/use-my-product/ui/MyProductItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";

const { getMyProducts, myProducts } = useGetMyProduct();

onMounted(async () => {
  await getMyProducts();
})
</script>

<style scoped>

</style>