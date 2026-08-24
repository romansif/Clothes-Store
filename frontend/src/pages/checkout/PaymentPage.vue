<template>
  <div class="bg-[#F0F0F0] lg:h-screen">
    <div class="font-[Montserrat] xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <img @click="goBack" :src="go_to_shop" alt="" class="rotate-180">
      <div class="flex flex-col mt-16">
        <h1 class="font-extrabold text-xl md:text-2xl xl:text-4xl">CHECKOUT</h1>
        <div class="flex gap-14 font-medium mt-8 text-xs md:text-sm xl:text-lg">
          <router-link :to="{ name: 'information' }">
            <span class="text-gray-400">#INFORMATION</span>
          </router-link>
          <router-link :to="{ name: 'shipping' }">
            <span class="text-gray-400">SHIPPING</span>
          </router-link>
          <router-link :to="{ name: 'payment' }">
            <span class="text-black">PAYMENT</span>
          </router-link>
        </div>
      </div>
      <div :class="checkoutClass()">
        <PaymentDashboard />
        <OrderInfo />
      </div>
    </div>
    <Transition name="notify">
      <Notification v-if="notify"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { goBack } = useCheckout();
const { notify } = useBaseModals();
const { checkoutClass } = checkoutClasses();

import { useCheckout } from "@/feature/checkout/lib/use-checkout.ts";
import { useBaseModals } from "@/shared/lib/base.modals.ts";
import { checkoutClasses } from "@/shared/constants/checkout/checkout.classes.ts";

import PaymentDashboard from "@/feature/checkout/ui/PaymentDashboard.vue";
import OrderInfo from "@/feature/checkout/ui/OrderInfo.vue";
import go_to_shop from "@/assets/icons/arrows/right-long-arrow.png";
import Notification from "@/shared/ui/Notification.vue";
</script>

<style scoped>

</style>