<template>
  <main class="flex flex-col gap-8 px-12 xl:mt-20">
    <FavoriteCartHeader />
    <div class="flex flex-col items-center justify-between xl:flex-row">
      <Transition name="view" mode="out-in">
        <CartList :user="user" />
      </Transition>
      <CartInfo v-if="cart.length" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { useResetCartSelection } from "@/features/cart-item-action/api/reset-cart-selection";
import { FavoriteCartHeader } from "@/widgets/favorite-cart-header";
import { CartList } from "@/widgets/cart-list";
import { CartInfo } from "@/features/cart-order-info";

const route = useRoute();
const router = useRouter();

const { user } = useUserData();
const { cart } = useCartData();
const { resetSelection } = useResetCartSelection();

onMounted(() => {
  if (route.query.reset) {
    resetSelection();
    router.replace({ query: {} });
  }
});
</script>
