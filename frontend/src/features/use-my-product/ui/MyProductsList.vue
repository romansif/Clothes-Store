<template>
  <Transition name="view">
    <div v-if="myProducts.length === 0" class="flex ml-145 pt-75">
      <div class="flex flex-col gap-4 items-center">
        <img :src="empty_products" alt="">
        <span class="text-lg font-semibold">You haven't created something product cover</span>
      </div>
    </div>
    <ul v-else class="font-raleway flex flex-col gap-20">
      <MyProductItem v-for="product in myProducts"
                     :user="userData"
                     :product="product"
                     :myProducts="myProducts"
                     @toggle-to-favorite="toggleToFavorite" />
    </ul>
  </Transition>
  <Transition name="modal">
    <StackInfoModal v-if="stackInfo" />
  </Transition>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetMyProduct } from "@/features/use-my-product/api/get-my-product.ts";
import { useToggleFavorite } from "@/features/use-favorite/api/toggle-to-favorite.ts";
import { stackInfo } from "@/features/use-my-product/lib/toggle-stack-info.ts";

import MyProductItem from "@/features/use-my-product/ui/MyProductItem.vue";
import empty_products from "@/assets/icons/products/icon-products.svg";
import StackInfoModal from "@/features/use-my-product/ui/StackInfoModal.vue";
import {userStore} from "@/features/use-profile/model/user.store.ts";

const { userData } = userStore();
const { toggleToFavorite } = useToggleFavorite();
const { getMyProducts, myProducts } = useGetMyProduct();

onMounted(async () => {
  await getMyProducts();
})
</script>

<style scoped>

</style>