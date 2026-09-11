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
import { watch } from "vue";
import { useAddShipping } from "@/features/use-shipping/api/add-shipping.ts";
import { shippingForm } from "@/features/use-shipping/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-shipping/lib/shipping.errors.ts";

import arrow from "@/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import ShippingMethods from "./ShippingMethods.vue";
import ShippingAddress from "./ShippingAddress.vue";

const { addShipping } = useAddShipping();

watch(() => shippingForm.value.delivery, (delivery) => {
  if(delivery){
    shippingFormError.value.deliveryError = false;
  }
})
</script>

<style scoped>

</style>