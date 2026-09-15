<template>
  <div class="flex flex-col lg:w-100 xl:w-125">
    <ShippingAddress />
    <div class="flex flex-col mt-8 gap-5">
      <label class="font-medium text-xs md:text-sm">
        SHIPPING METHODS
      </label>
      <div class="flex gap-3">
        <form @submit.prevent="addShipping" class="flex flex-col gap-6 w-full">
          <ShippingMethod :title="'STANDARD SHIPPING'"
                               :text="'Delivery in 3-5 business days'"
                               :price="'Free'" />
          <ShippingMethod :title="'EXPRESS COURIER'"
                               :text="'Delivery tomorrow morning'"
                               :price="'$15.00'" />
        </form>
      </div>
    </div>
    <div class="relative mt-5 ml-auto transition duration-400 hover:scale-110">
      <BaseButton type="submit" name="Payment" variant="checkOut"/>
      <img :src=arrow alt="" class="h-13 absolute left-75 top-1/2 -translate-y-1/2
            sm:left-60 md:left-77 lg:left-34 xl:left-46">
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useAddShipping } from "@/features/use-checkout-shipping-info/api/add-shipping.ts";
import { shippingForm } from "@/features/use-checkout-shipping-info/model/shipping.form.ts";
import { shippingFormError } from "@/features/use-checkout-shipping-info/model/shipping.errors.ts";

import arrow from "@/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import ShippingAddress from "./ShippingAddress.vue";
import ShippingMethod from "@/shared/ui/checkout/ShippingMethod.vue";

const { addShipping } = useAddShipping();

watch(() => shippingForm.value.delivery, (delivery) => {
  if(delivery){
    shippingFormError.value.delivery = false;
  }
})
</script>

<style scoped>

</style>