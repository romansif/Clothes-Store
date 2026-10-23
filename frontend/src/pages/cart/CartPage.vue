<template>
  <main class="flex flex-col gap-8 mt-10 xl:mt-30 xl:px-10">
    <FavoriteCartHeader />
    <Transition name="view">
      <div class="flex flex-col items-center xl:flex-row xl:gap-35">
        <CartList />
        <CartInfo />
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { getCartProducts } from "@/widgets/cart-list/api/get-cart";

import { FavoriteCartHeader } from "@/widgets/favorite-cart-header";
import { CartList } from "@/widgets/cart-list";
import { CartInfo } from "@/features/cart-order-info";

onMounted(async () => {
  await getCartProducts();
})
</script>
