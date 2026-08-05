<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useShipping } from "@/feature/checkout/composables/use.shipping.ts";
import { useAddress } from "@/feature/checkout/composables/use.address.ts";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { checkoutErrors } from "@/shared/composables/errors/errors-messages/checkout.errors";

import arrow from "@/app/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import ShippingMethods from "./shipping-items/ShippingMethods.vue";
import ShippingAddress from "./shipping-items/ShippingAddress.vue";

const { shipping } = checkoutForms();
const { addShipping } = useShipping();
const { shippingErrors } = checkoutErrors();
const { getAddress } = useAddress();

watch(() => shipping.value.delivery, (delivery) => {
  if(delivery){
    shippingErrors.value.deliveryError = false;
  }
})

onMounted(async () => {
  await getAddress();
})
</script>

<template>
  <div class="flex flex-col lg:w-[400px] xl:w-[500px]">
    <ShippingAddress />
    <ShippingMethods />
      <div class="relative mt-5 ml-auto">
        <BaseButton @click="addShipping" name="Payment" variant="checkOut"/>
        <img :src=arrow alt="" class="h-13 absolute left-75 top-1/2 -translate-y-1/2
            sm:left-60 md:left-77 lg:left-34 xl:left-46">
      </div>
  </div>
</template>

<style scoped>

</style>