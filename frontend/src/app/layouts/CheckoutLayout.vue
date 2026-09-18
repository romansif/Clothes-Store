<template>
  <div class="bg-[#F0F0F0] min-h-screen">
    <div class="font-raleway xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <CheckoutHeader />
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
import { useBaseModals } from "@/shared/lib/base-modal.ts";
import { checkoutClasses } from "@/shared/const/checkout/checkout.classes.ts";

import Notification from "@/shared/ui/Notification.vue";
import OrderInfo from "@/features/use-checkout-order/ui/OrderInfo.vue";
import CheckoutHeader from "@/widgets/checkout/CheckoutHeader.vue";

const { notify } = useBaseModals();
const { checkoutClass } = checkoutClasses();
</script>

<style scoped>

</style>