<template>
  <div class="bg-[#F0F0F0] lg:h-screen">
    <div class="font-raleway xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <img @click="goBack" :src="go_to_shop" alt="" class="rotate-180">
      <header class="flex flex-col mt-16">
        <h1 class="font-extrabold text-xl md:text-2xl xl:text-4xl">CHECKOUT</h1>
        <div class="flex gap-14 font-medium mt-8 text-xs md:text-sm xl:text-lg">
          <router-link :to="{ name: 'information' }">
            <span :class="isInfo ? 'text-black' : 'text-gray-400'">#INFORMATION</span>
          </router-link>
          <router-link :to="{ name: 'shipping' }">
            <span :class="isShipping ? 'text-black' : 'text-gray-400'">SHIPPING</span>
          </router-link>
          <router-link :to="{ name: 'payment' }">
            <span :class="isPayment ? 'text-black' : 'text-gray-400'">PAYMENT</span>
          </router-link>
        </div>
      </header>
      <main :class="checkoutClass()">
        <router-view />
        <OrderInfo />
      </main>
    </div>
    <Transition name="notify">
      <Notification v-if="notify"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { checkoutClasses } from "@/shared/const/checkout/checkout.classes.ts";
import { useUpdateCart } from "@/features/use-cart/api/update-cart.ts";

import Notification from "@/shared/ui/Notification.vue";
import OrderInfo from "@/features/use-checkout-order/ui/OrderInfo.vue";
import go_to_shop from "@/assets/icons/arrows/right-long-arrow.png";

const route = useRoute();
const router = useRouter();

const { notify } = useBaseModals();
const { checkoutClass } = checkoutClasses();
const { updateCartChecked } = useUpdateCart();

const isInfo = computed(() => route.name === 'information')
const isShipping = computed(() => route.name === 'shipping')
const isPayment = computed(() => route.name === 'payment')

const goBack = async () => {
  router.back();
  if(route.name === 'information') {
    await updateCartChecked()
  }
};
</script>

<style scoped>

</style>