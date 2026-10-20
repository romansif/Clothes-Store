<template>
  <main class="mt-10 xl:mt-30 xl:px-10">
    <FavoriteCartHeader />
    <Transition name="view">
      <div class="flex flex-col xl:flex-row xl:justify-between">
        <div class="flex flex-col xl:flex-row xl:gap-35">
          <CartList />
          <CartInfo />
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";

import CartList from "@/features/use-cart/ui/CartList.vue";
import CartInfo from "@/features/use-cart/ui/CartInfo.vue";

import FavoriteCartHeader from "@/widgets/ui/navigation/FavoriteCartHeader.vue";

const { getCartProducts } = useGetCart();

onMounted(async () => {
  await getCartProducts();
})
</script>

<style scoped>

</style>