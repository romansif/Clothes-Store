<template>
  <div class="bg-[#F0F0F0] min-h-screen">
    <div class="font-raleway xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
      <CheckoutHeader />
      <main :class="checkoutClass">
        <router-view />
        <OrderInfo />
      </main>
    </div>
  </div>
  <Transition name="modal">
    <Notification v-if="notify" />
  </Transition>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/use-notify.ts";
import { checkoutClass } from "@/shared/model/saved-checkout-info.variants.ts";

import Notification from "@/shared/ui/Notification.vue";
import OrderInfo from "@/features/use-checkout-order/ui/OrderInfo.vue";
import CheckoutHeader from "@/widgets/ui/checkout/CheckoutHeader.vue";

const { notify } = useBaseModals();
</script>

<style scoped>

</style>