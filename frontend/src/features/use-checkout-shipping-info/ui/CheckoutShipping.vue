<template>
  <div class="flex flex-col lg:w-100 xl:w-125">
    <ShippingAddress :user-address="userAddress" />
    <div class="flex flex-col mt-8 gap-5">
      <label class="font-medium text-xs md:text-sm">
        SHIPPING METHODS
      </label>
      <div class="flex gap-3">
        <form @submit.prevent="addShipping" class="flex flex-col gap-6 w-full">
          <ShippingMethod v-model="shippingForm.delivery"
                          :method="'standard'"
                          :title="'STANDARD SHIPPING'"
                          :text="'Delivery in 3-5 business days'"
                          :price="'Free'"
                          :error-message="shippingFormErrorMessage.delivery" />
          <ShippingMethod v-model="shippingForm.delivery"
                          :method="'express'"
                          :title="'EXPRESS COURIER'"
                          :text="'Delivery tomorrow morning'"
                          :price="'$15.00'"
                          :error-message="shippingFormErrorMessage.delivery" />
          <div class="relative mt-5 ml-auto transition duration-400 hover:scale-110">
            <BaseButton type="submit"
                        name="Payment"
                        variant="checkOut"/>
            <img :src=arrow alt="" class="h-13 absolute left-75 top-1/2 -translate-y-1/2
                                   sm:left-60 md:left-77 lg:left-34 xl:left-46">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { refClearErrorsOnChange } from "@/shared/lib/helper/errors-helper.ts";
import { informationContactStore } from "@/features/use-user-address/model/address.store.ts";
import { useAddShipping } from "@/features/use-checkout-shipping-info/api/add-shipping.ts";
import { shippingForm, shippingFormErrorMessage } from "@/entities/checkout-shipping/model/shipping.form.ts";

import arrow from "@/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import ShippingAddress from "../../../entities/checkout-shipping/ui/ShippingAddress.vue";
import ShippingMethod from "@/shared/ui/checkout/ShippingMethod.vue";

const { addShipping } = useAddShipping();
const { userAddress } = informationContactStore();

refClearErrorsOnChange(
    shippingForm,
    shippingFormErrorMessage
)
</script>

<style scoped>

</style>