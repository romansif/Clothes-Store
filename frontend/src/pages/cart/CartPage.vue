<template>
  <main class="mt-10 xl:mt-30 xl:px-10">
    <header class="flex flex-col">
      <div class="flex gap-14 items-center font-semibold text-sm">
        <router-link :to="{name: 'cart'}">
            <span :class="isShoppingCart ? 'text-[#A3A3A3]' : ''">
              SHOPPING BAG <span class="font-dm-sans">({{ cartCount }})</span>
            </span>
        </router-link>
        <div class="flex items-center gap-2">
          <img :src="liked" alt="" class="w-8.75">
          <router-link :to="{name: 'favorite'}">
              <span :class="isFavoriteProducts ? 'text-[#A3A3A3]' : ''">
                FAVORITES <span class="font-dm-sans">({{ favoritesCount }})</span>
              </span>
          </router-link>
        </div>
      </div>
    </header>
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
          <CartInfo/>
        </div>
      </div>
    </Transition>
    <div class="font-montserrat flex flex-col mt-3 xl:hidden">
      <div class="flex flex-col gap-4">
        <div class="flex gap-4 items-center">
          <img @click="toggleAgree" :src="isAgreeFormError.agreeError ? check_square : square"
               alt="" class="w-6.25 transition duration-400 hover:scale-120">
          <span class="text-xs text-[#A3A3A3]">
                I agree to the Terms and Conditions
              </span>
        </div>
        <span class="text-red-600 text-xs">{{ isAgreeForm.agreeMessage }}</span>
      </div>
      <BaseButton @click="continueToOrder" name="CONTINUE" variant="addToOrder" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted, watch } from "vue";
import { useGetCart } from "@/features/use-cart/api/get-cart.ts";
import { useGetFavorite } from "@/features/use-favorite/api/get-favorite.ts";
import { useProfile } from "@/features/use-profile/lib/use-profile.ts";
import { cartStore } from "@/features/use-cart/model/cart.store.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { checkoutErrors } from "@/features/use-checkout/lib/checkout.errors.ts";

import square from "@/assets/icons/squares/square.png";
import CartList from "@/features/use-cart/ui/CartList.vue";
import CartInfo from "@/features/use-cart/ui/CartInfo.vue";
import liked from "@/assets/icons/nav/liked.png";
import BaseButton from "@/shared/ui/BaseButton.vue";
import empty_cart from '@/assets/icons/products/empty-cart.svg';
import check_square from "@/assets/icons/squares/check-square.png";

const { cart } = cartStore();
const { isAgreeForm } = checkoutForm();
const { getCartProducts } = useGetCart();
const { isAgreeFormError } = checkoutErrors();
const { getFavoriteProducts } = useGetFavorite();
const { toggleAgree, continueToOrder, cartCount, favoritesCount } = useProfile();

const route = useRoute();

const isShoppingCart = computed(() => route.name !== 'cart')
const isFavoriteProducts = computed(() => route.name !== 'favorite')

onMounted(async () => {
  await getCartProducts();
  await getFavoriteProducts();
})

watch(() => isAgreeFormError.value.agreeError, (agreeError) => {
  if(agreeError === true) {
    isAgreeForm.value.agreeMessage = ''
  }
});

</script>

<style scoped>

</style>