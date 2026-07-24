<script setup lang="ts">
import { watch } from "vue";
import { useAddProfile } from "../../profile/profile-composables/useAddProfile.ts";
import { checkoutForms } from "../../../shared/composables/forms-composables/forms/checkout.forms.ts";
import { checkoutErrors } from "../../../shared/composables/forms-composables/forms-errors/checkout.errors.ts";

import arrow from "../../../app/assets/icons/arrows/shop.svg";
import ShippingMethods from "./shipping-items/ShippingMethods.vue";
import ShippingAddress from "./shipping-items/ShippingAddress.vue";
import BaseButton from "../../../shared/ui/button/BaseButton.vue";

const { addShipping } = useAddProfile();
const { shipping } = checkoutForms();
const { shippingErrors } = checkoutErrors();

watch(() => shipping.value.delivery, (delivery) => {
  if(delivery){
    shippingErrors.value.deliveryError = false
  }
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