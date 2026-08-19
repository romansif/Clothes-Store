<template>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2 w-full">
      <label>Card Name</label>
      <input v-model="payment.cardName" type="text" class="border border-gray-300 rounded-xl outline-none
          px-4 py-3 text-xs transition duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50 appearance-none"
             placeholder="Card Name is optional"/>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label>Card Number</label>
      <IMask v-model:value="payment.cardNumber" type="text" :mask="cardNumberMask.mask"
          :class="[`border border-gray-300 rounded-xl outline-none px-4 py-3 text-xs transition duration-400
                bg-[#D9D9D9]/40 hover:bg-gray-50 appearance-none placeholder:text-sm`,
             paymentErrors.cardNumberError ? 'placeholder:text-red-500 border-red-400 placeholder:text-xs'
             : 'placeholder:text-gray-600']"
          :placeholder="cardNumberPlaceholder" />
    </div>
  </div>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2">
      <label>Expiry date</label>
      <IMask v-model.value="payment.expiryDate" type="text" inputmode="numeric" :mask="expiryDateMask.mask"
          :class="[`border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
                outline-none px-4 py-3 text-xs transition duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50`,
             paymentErrors.expiryDateError ? 'placeholder:text-red-500 border-red-400 placeholder:text-xs'
             : 'placeholder:text-gray-600']"
          :placeholder="expiryDatePlaceholder" />
    </div>
    <div class="flex flex-col gap-2">
      <label>CVV</label>
      <IMask v-model.value="payment.cardCvv" type="text" inputmode="numeric" :mask="cardCvv.mask"
          :class="[`border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
              outline-none px-4 py-3 text-xs transition duration-400 bg-[#D9D9D9]/40 hover:bg-gray-50 placeholder:text-lg`,
            paymentErrors.cardCvvError ? 'placeholder:text-red-500 border-red-400 placeholder:text-xs'
            : 'placeholder:text-gray-600']"
          :placeholder="cardCvvPlaceholder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { usersStore } from "@/shared/composables/stores/users.store";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { checkoutErrors }from "@/shared/composables/errors/errors-messages/checkout.errors";
import { checkoutPlaceholder } from "@/feature/checkout/checkout-actions/checkout.placeholder.ts";

const { payment } = checkoutForms();
const { paymentErrors } = checkoutErrors();
const { cardNumberMask, expiryDateMask, cardCvv } = usersStore();
const { cardNumberPlaceholder, expiryDatePlaceholder, cardCvvPlaceholder } = checkoutPlaceholder();
</script>

<style scoped>

</style>