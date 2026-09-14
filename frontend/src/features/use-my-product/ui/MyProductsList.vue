<template>
  <Transition name="view">
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
    <ul v-else class="font-raleway flex flex-col gap-20">
      <MyProductItem v-for="product in myProducts" :product="product" :myProducts="myProducts" />
    </ul>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetMyProduct } from "@/features/use-my-product/api/get-my-product.ts";

import MyProductItem from "@/features/use-my-product/ui/MyProductItem.vue";
import icon_products from "@/assets/icons/products/icon-products.svg";

const { getMyProducts, myProducts } = useGetMyProduct();

onMounted(async () => {
  await getMyProducts();
})
</script>

<style scoped>

</style>