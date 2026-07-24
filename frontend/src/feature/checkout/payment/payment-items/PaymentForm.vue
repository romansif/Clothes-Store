<script setup lang="ts">
import { checkoutForms } from "../../../../shared/composables/forms-composables/forms/checkout.forms.ts";
import { checkoutErrors }from "../../../../shared/composables/forms-composables/forms-errors/checkout.errors.ts";

const { paymentErrors } = checkoutErrors();
const { payment, paymentMessages } = checkoutForms();

const formatCardNumber = (event: Event) => {
  const input = event.target as HTMLInputElement;

  let value = input.value.replace(/\D/g, '');

  value = value.substring(0, 16)

  const formatted = value.match(/.{1,4}/g)?.join(' ') || '';

  payment.value.cardNumber = formatted;
  input.value = formatted;
}
</script>

<template>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2 w-full">
      <label>Card Name</label>
      <input v-model="payment.cardName" type="text" class="border border-gray-200 rounded-xl outline-none
          px-4 py-3 text-sm bg-white appearance-none" placeholder="Card Name is optional"/>
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label>Card Number</label>
      <input v-model="payment.cardNumber" type="text" @input="formatCardNumber" class="border border-gray-200 rounded-xl outline-none
          px-4 py-3 text-xs bg-white appearance-none placeholder:text-lg" placeholder="xxxx xxxx xxxx xxxx" />
      <span v-if="paymentErrors.cardNumberError" class="text-red-600 text-xs">
        {{ paymentMessages.cardNumberMessage }}
      </span>
    </div>
  </div>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2">
      <label>Expiry date</label>
      <input v-model="payment.expiryDate" type="text" inputmode="numeric" class="border border-gray-200 rounded-xl w-full
          sm:w-[300px] md:w-[365px] lg:w-[195px] xl:w-[245px] outline-none px-4 py-3 text-xs bg-white"
          placeholder="MM / YY">
      <span v-if="paymentErrors.expiryDateError" class="text-red-600 text-xs">
        {{ paymentMessages.expiryDateMessage }}
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <label>CVV</label>
      <input  v-model="payment.cardCvv" type="number" inputmode="numeric" class="border border-gray-200 rounded-xl w-full
          sm:w-[300px] md:w-[365px] lg:w-[195px] xl:w-[245px] outline-none px-4 py-3 text-xs bg-white placeholder:text-xl"
          placeholder="•••">
      <span v-if="paymentErrors.cardCvvError" class="text-red-600 text-xs">
        {{ paymentMessages.cardCvvMessage }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>