<template>
  <div class="flex flex-col lg:w-100 xl:w-125">
    <ShippingAddress :user-address="userAddress" />
    <div class="flex flex-col mt-8 gap-5">
      <label class="font-medium text-xs md:text-sm">
        SHIPPING METHODS
      </label>
      <div class="flex gap-3">
        <form @submit.prevent="addShipping"
              class="flex flex-col gap-6 w-full">
          <ShippingMethod v-model="shippingForm.delivery"
                          :method="'standard'"
                          :error-message="shippingFormErrorMessage.delivery"  />
          <ShippingMethod v-model="shippingForm.delivery"
                          :method="'express'"
                          :error-message="shippingFormErrorMessage.delivery" />
          <div class="relative mt-5 ml-auto transition duration-400 hover:scale-110">
            <UiButton type="submit"
                      name="Payment"
                      variant="checkOut"/>
            <img :src=arrow alt=""
                 class="h-13 absolute left-75 top-1/2 -translate-y-1/2
                 sm:left-60 md:left-77 lg:left-34 xl:left-46">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { informationContactStore } from "@/shared/model/address.store";
import { useGetAddress } from "@/features/use-user-address/api/get-address";
import { addShipping } from "@/features/checkout-shipping-info/api/add-shipping";
import { shippingForm, shippingFormErrorMessage } from "@/entities/checkout-shipping/model/shipping-form";
import { UiButton } from "@/shared/ui/button";
import { ShippingAddress } from "@/entities/checkout-shipping";
import { ShippingMethod } from "@/shared/ui/shipping-method";

import arrow from "@/assets/icons/arrows/right-shop.svg";

const { getAddress } = useGetAddress();
const { userAddress } = informationContactStore();

refClearErrorsOnChange(
    shippingForm,
    shippingFormErrorMessage
)

onMounted(async () => {
  await getAddress();
})
</script>
