<template>
  <div class="bg-[#F0F0F0] h-screen">
    <Loading v-if="loading" />
    <div v-else-if="componentError" class="flex flex-col items-center justify-center pt-80 p-6 text-red-700 rounded-xl">
      <span class="text-lg font-semibold mb-2">
        Something went wrong 😔
      </span>
      <p class="text-sm mb-4">{{ componentError }}</p>
      <BaseButton name="Try again" variant="refresh" @click="resetError('CART_FAVORITE')" />
    </div>
    <div v-else class="font-[Montserrat] xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <MainNavBar />
      <div class="mt-10 xl:mt-30 xl:px-10">
        <div class="flex flex-col">
          <div class="flex gap-14 items-center font-semibold text-sm">
            <router-link :to="{name: 'cart'}">
            <span :class="isShoppingCart ? 'text-[#A3A3A3]' : ''">
              SHOPPING BAG ({{ cartCount }})
            </span>
            </router-link>
            <div class="flex items-center gap-2">
              <img :src="liked" alt="" class="w-8.75">
              <router-link :to="{name: 'favorite'}">
              <span :class="isFavoriteProducts ? 'text-[#A3A3A3]' : ''">
                FAVORITES ({{ favoritesCount }})
              </span>
              </router-link>
            </div>
          </div>
        </div>
        <Transition name="view">
          <div class="flex flex-col xl:flex-row xl:justify-between">
            <div v-if="cart.length === 0" class="flex flex-col gap-5 items-center pl-[413.5px] pt-55">
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
      </div>
    </div>
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
    <Transition name="notify">
      <Notification v-if="notify"/>
    </Transition>
    <Transition name="notify">
      <DeleteModal v-if="deleteChoice"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { cart } = cartStore();
const { isAgreeForm } = checkoutForm();
const { notify, loading } = useBaseModals();
const { deleteChoice } = useProfileModals();
const { isAgreeFormError } = checkoutErrors();
const { resetError, componentError } = errorHandler();
const { toggleAgree, continueToOrder, cartCount, favoritesCount } = useProfile();

import { useRoute } from "vue-router";
import { useProfile } from "@/features/use-profile/model/use-profile.ts";
import { computed, watch } from "vue";
import { cartStore } from "@/entities/cart/model/cart.store.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile.modal.ts";
import { errorHandler } from "@/shared/lib/errors/error-handler.ts";
import { checkoutErrors } from "@/features/use-checkout/lib/checkout.errors.ts";

import MainNavBar from "@/widgets/navigation/ui/MainNavBar.vue";
import square from "@/assets/icons/squares/square.png";
import CartList from "@/entities/cart/ui/CartList.vue";
import CartInfo from "@/entities/cart/ui/CartInfo.vue";
import liked from "@/assets/icons/nav/liked.png";
import BaseButton from "@/shared/ui/BaseButton.vue";
import empty_cart from '@/assets/icons/products/empty-cart.svg';
import check_square from "@/assets/icons/squares/check-square.png";
import DeleteModal from "@/shared/ui/DeleteModal.vue";
import Notification from "@/shared/ui/Notification.vue";
import Loading from "@/shared/ui/Loading.vue";

const route = useRoute();

const isShoppingCart = computed(() => route.name !== 'cart')

const isFavoriteProducts = computed(() => route.name !== 'favorite')

watch(() => isAgreeFormError.value.agreeError, (agreeError) => {
  if(agreeError === true) {
    isAgreeForm.value.agreeMessage = ''
  }
});
</script>

<style scoped>

</style>