<template>
  <div class="flex flex-col lg:w-100 xl:w-125">
    <ShippingAddress />
    <ShippingMethods />
      <div class="relative mt-5 ml-auto transition duration-400 hover:scale-110">
        <BaseButton @click="addShipping" name="Payment" variant="checkOut"/>
        <img :src=arrow alt="" class="h-13 absolute left-75 top-1/2 -translate-y-1/2
            sm:left-60 md:left-77 lg:left-34 xl:left-46">
      </div>
  </div>
</template>

<script setup lang="ts">
const { shipping } = checkoutForm();
const { addShipping } = useAddShipping();
const { shippingErrors } = checkoutErrors();

import { watch } from "vue";
import { useAddShipping } from "@/features/use-checkout/api/shipping/add-shipping.ts";
import { checkoutForm } from "@/features/use-checkout/model/checkout.form.ts";
import { checkoutErrors } from "@/features/use-checkout/lib/checkout.errors.ts";

import arrow from "@/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import ShippingMethods from "./ShippingMethods.vue";
import ShippingAddress from "./ShippingAddress.vue";

watch(() => shipping.value.delivery, (delivery) => {
  if(delivery){
    shippingErrors.value.deliveryError = false;
  }
})
</script>

<style scoped>

</style>