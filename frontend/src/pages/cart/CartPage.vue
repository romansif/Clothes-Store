<template>
  <main class="flex flex-col gap-8 mt-10 xl:mt-30">
    <FavoriteCartHeader />
    <Transition name="view" mode="out-in">
      <div class="flex flex-col items-center xl:flex-row xl:gap-35">
        <CartList :user="user" />
        <CartInfo v-if="cart.length" :cart="cart" />
      </div>
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { FavoriteCartHeader } from "@/widgets/favorite-cart-header";
import { CartList } from "@/widgets/cart-list";
import { CartInfo } from "@/features/cart-order-info";

const { user } = useUserData()
const { cart } = useCartData()
</script>
