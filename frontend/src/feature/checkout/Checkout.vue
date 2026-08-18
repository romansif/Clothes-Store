<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from "vue";
import { checkout } from "./composables/checkout.ts";
import { useBaseModals } from "@/shared/composables/modals/base.modals";

import PaymentDashboard from "./payment/PaymentDashboard.vue";
import CheckoutShipping from "./shipping/CheckoutShipping.vue";
import OrderInfo from "./order-information/OrderInfo.vue";
import go_to_shop from "@/app/assets/icons/arrows/right-long-arrow.png";
import CheckoutInfo from "./information/CheckoutInfo.vue";
import Notification from "@/shared/ui/base/base-modals/Notification.vue";

const route = useRoute();

const { goBack } = checkout();
const { notify } = useBaseModals();

const isPayment = computed(() =>  route.name !== 'payment');
const isInfo = computed(() =>  route.name !== 'information');
const isShipping = computed(() =>  route.name !== 'shipping');
</script>

<template>
  <div class="font-[Montserrat] xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <img @click="goBack" :src="go_to_shop" alt="" class="rotate-180">
    <div class="flex flex-col mt-16">
      <h1 class="font-extrabold text-xl md:text-2xl xl:text-4xl">CHECKOUT</h1>
      <div class="flex gap-14 font-medium mt-8 text-xs md:text-sm xl:text-lg">
        <router-link :to="{ name: 'information' }">
          <span :class="isInfo ? 'text-gray-400' : ''">#INFORMATION</span>
        </router-link>
        <router-link :to="{ name: 'shipping' }">
          <span :class="isShipping ? 'text-gray-400' : ''">SHIPPING</span>
        </router-link>
        <router-link :to="{ name: 'payment' }">
          <span :class="isPayment ? 'text-gray-400' : ''">PAYMENT</span>
        </router-link>
      </div>
    </div>
    <div :class="isInfo ? 'hidden' : 'flex flex-col lg:flex-row lg:gap-50 xl:gap-100'">
      <CheckoutInfo />
      <OrderInfo />
    </div>
    <div :class="isShipping ? 'hidden' : 'flex flex-col lg:flex-row lg:gap-50 xl:gap-100'">
      <CheckoutShipping />
      <OrderInfo />
    </div>
    <div :class="isPayment ? 'hidden' : 'flex flex-col lg:flex-row lg:gap-50 xl:gap-100'">
      <PaymentDashboard />
      <OrderInfo />
    </div>
  </div>
  <Transition name="notify">
    <Notification v-if="notify"/>
  </Transition>
</template>

<style scoped>

</style>