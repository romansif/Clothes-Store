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
import { useGetCart } from "@/features/use-cart/api/get-cart";

import { CartList } from "@/features/use-cart";
import { CartInfo } from "@/features/use-cart";
import { FavoriteCartHeader } from "@/widgets/ui/navigation";

const { getCartProducts } = useGetCart();

onMounted(async () => {
  await getCartProducts();
})
</script>
