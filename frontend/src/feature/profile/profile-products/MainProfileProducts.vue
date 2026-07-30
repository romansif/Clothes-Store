<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, watch } from "vue";
import { useGetProducts } from "@/feature/products/composables/getProducts.ts";
import { productsStore } from "@/shared/composables/stores/products.store.ts";
import { useProfileModals } from "@/shared/composables/modals/profile/profileModals.ts";
import { useProfileProducts } from "../profile-composables/useProfileProducts.ts";
import { useProductsModals } from "@/shared/composables/modals/products/productsModals.ts";
import { checkoutForms } from "@/shared/composables/forms-composables/forms/checkout.forms.ts";
import { checkoutErrors } from "@/shared/composables/forms-composables/forms-errors/checkout.errors.ts";

import ChoiceModal from "@/shared/ui/ChoiceModal.vue";
import square from "@/app/assets/icons/square.png";
import liked from "@/app/assets/icons/nav/liked.png";
import NavBar from "../../navigation/NavBar.vue";
import CartInfo from "./products-cart/CartInfo.vue";
import CartList from "./products-cart/CartList.vue";
import BaseButton from "@/shared/ui/button/BaseButton.vue";
import check_square from "@/app/assets/icons/check-square.png";
import FavoriteList from "./favorite-products/FavoriteList.vue";
import Notification from "@/shared/ui/products-modals/Notification.vue";

const route = useRoute();

const { isAgreeForm } = checkoutForms()
const { isAgreeFormError } = checkoutErrors();

const { notify } = useProductsModals();
const { cart, favorite } = productsStore();
const { deleteChoice } = useProfileModals();
const { toggleAgree, continueToOrder } = useProfileProducts();
const { getCartProducts, getFavoriteProducts } = useGetProducts();

const isShoppingCart = computed(() => route.name !== '/profile/profile-products/ProductsCartPage');
const isFavoriteProducts = computed(() => route.name !== '/profile/profile-products/FavoriteProductsPage');

const cartCount = computed(() => {
  return cart.value.length;
});
const favoritesCount = computed(() => {
  return favorite.value.length;
});

watch(() => isAgreeFormError.value.agreeError, (agreeError) => {
  if(agreeError === true) {
    isAgreeForm.value.agreeMessage = ''
  }
});

onMounted(async() => {
  await getCartProducts();
  await getFavoriteProducts()
});
</script>

<template>
  <div class="font-[Montserrat] xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <NavBar />
    <div class="mt-10 xl:mt-25 xl:px-10">
      <div class="flex flex-col">
        <div class="flex gap-14 items-center font-medium text-sm">
          <router-link :to="{name: '/profile/profile-products/ProductsCartPage'}">
            <span :class="isShoppingCart ? 'text-[#A3A3A3]' : ''">
              SHOPPING BAG ({{ cartCount }})
            </span>
          </router-link>
          <div class="flex items-center gap-2">
              <img :src="liked" alt="" class="w-[35px]">
            <router-link :to="{name: '/profile/profile-products/FavoriteProductsPage'}">
              <span :class="isFavoriteProducts ? 'text-[#A3A3A3]' : ''">
                FAVORITES ({{ favoritesCount }})
              </span>
            </router-link>
          </div>
        </div>
      </div>
      <div :class="isShoppingCart ? 'hidden' : 'flex flex-col xl:flex-row xl:justify-between'">
        <CartList v-if="cart.length > 0" />
        <div v-else class="flex items-center px-105">
          <span class="text-[#A3A3A3] text-xl">Cart is empty</span>
        </div>
        <CartInfo />
      </div>
      <div v-if="favorite.length > 0" :class="isFavoriteProducts ? 'hidden' :
          'flex flex-col xl:flex-row xl:justify-between'">
        <FavoriteList />
      </div>
      <div v-else :class="isFavoriteProducts ? 'hidden' : 'flex justify-center py-55'">
        <span class="text-[#A3A3A3] text-xl">
          Favorite products addn't
        </span>
      </div>
    </div>
  </div>
  <div :class="isShoppingCart ? 'hidden' : 'font-[Montserrat] flex flex-col mt-3 xl:hidden'">
    <div class="flex flex-col gap-4">
      <div class="flex gap-4 items-center">
        <img @click="toggleAgree" :src="isAgreeFormError.agreeError ? check_square : square"
             alt="" class="w-[25px] transition duration-400 hover:scale-120">
        <span class="text-xs text-[#A3A3A3]">
          I agree to the Terms and Conditions
        </span>
      </div>
      <span class="text-red-600 text-xs">{{ isAgreeForm.agreeMessage }}</span>
    </div>
    <BaseButton @click="continueToOrder" name="CONTINUE" variant="addToOrder" />
  </div>
  <Transition>
    <Notification v-if="notify"/>
  </Transition>
  <Transition>
    <ChoiceModal v-if="deleteChoice"/>
  </Transition>
</template>

<style scoped>
/* мы объясним, что делают эти классы дальше! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>