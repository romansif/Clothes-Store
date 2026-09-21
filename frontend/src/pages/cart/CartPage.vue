<template>
  <main class="mt-10 xl:mt-30 xl:px-10">
    <FavoriteCartHeader />
    <Transition name="view">
      <div class="flex flex-col xl:flex-row xl:justify-between">
        <div v-if="cart.length === 0" class="flex flex-col gap-5 items-center pl-110 pt-55">
          <img :src="empty_cart" alt="">
          <div class="flex flex-col gap-2 items-center">
            <span class="font-bold">Cart is empty</span>
            <span class="text-[#A3A3A3]">
              It’s the perfect time to go shopping or check out this year’s new releases.
            </span>
          </div>
        </div>
        <div v-else class="flex flex-col xl:flex-row xl:gap-35">
          <CartList />
          <CartInfo />
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";

import CartList from "@/features/use-cart/ui/CartList.vue";
import CartInfo from "@/entities/cart/ui/CartInfo.vue";

import empty_cart from '@/assets/icons/products/empty-cart.svg';
import FavoriteCartHeader from "@/widgets/navigation/ui/FavoriteCartHeader.vue";

const { cart } = cartStore();
const { getCartProducts } = useGetCart();

onMounted(async () => {
  await getCartProducts();
})
</script>

<style scoped>

</style>