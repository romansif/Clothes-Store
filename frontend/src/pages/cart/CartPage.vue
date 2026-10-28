<template>
  <Loading v-if="isPending" />
  <ErrorState v-else-if="isError" />
  <main v-else-if="cart.length" class="flex flex-col gap-8 mt-10 xl:mt-30 xl:px-10">
    <FavoriteCartHeader />
    <Transition name="view">
      <div class="flex flex-col items-center xl:flex-row xl:gap-35">
        <CartList :user="user" />
        <CartInfo />
      </div>
    </Transition>
  </main>
  <EmptyState v-else />
</template>

<script setup lang="ts">
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { FavoriteCartHeader } from "@/widgets/favorite-cart-header";
import { CartList } from "@/widgets/cart-list";
import { CartInfo } from "@/features/cart-order-info";
import { Loading, EmptyState, ErrorState } from "@/widgets/state";

const { user } = useUserData()
const { cart, isPending, isError } = useCartData()
</script>
