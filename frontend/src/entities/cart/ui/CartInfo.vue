<template>
  <div class="flex flex-col mt-7.5 gap-4 font-medium w-100">
    <div class="flex flex-col gap-2 sm:pb-3">
    <span class="text-lg xl:text-xl">
      ORDER SUMMARY
    </span>
      <div class="flex flex-col mt-2 gap-1 sm:gap-2 xl:mt-4">
        <div class="flex justify-between text-sm xl:text-lg">
          <span>Subtotal</span>
          <span>$ {{ price }}</span>
        </div>
        <div class="flex justify-between text-sm xl:text-lg">
          <span>Shipping</span>
          <span>$ {{ price }}</span>
        </div>
      </div>
    </div>
    <div class="border-b"></div>
    <div class="flex items-center justify-between text-lg lg:gap-12 xl:text-xl">
      <div class="flex flex-col">
      <span class="text-xs text-[#A3A3A3]">
        $ {{ commissionPrice }} commission and service operation
      </span>
        <div class="flex items-center gap-2 mt-3">
          <h1 class="font-medium">TOTAL</h1>
          <span class="text-[#A3A3A3] text-sm xl:text-lg">(TAX INCL.)</span>
        </div>
      </div>
      <span>$ {{ totalPrice }}</span>
    </div>
    <div class="flex flex-col mt-2 xl:block">
      <div class="flex flex-col gap-4">
        <div class="flex gap-4 items-center">
          <img @click="toggleAgree" :src="isAgreeFormError.agreeError ? check_square : square" alt="" class="w-6.25 cursor-pointer">
          <span class="text-xs text-[#A3A3A3]">
          I agree to the Terms and Conditions
        </span>
        </div>
        <span class="text-red-600 text-xs">{{ isAgreeForm.agreeMessage }}</span>
      </div>
      <BaseButton @click="continueToOrder" name="CONTINUE" variant="addToOrder" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useProfile } from "@/feature/use-profile/model/use-profile.ts";
import { checkoutForm } from "@/feature/use-checkout/model/checkout.form.ts";
import { checkoutErrors } from "@/feature/use-checkout/lib/checkout.errors.ts";

import BaseButton from "@/shared/ui/BaseButton.vue";
import square from '@/assets/icons/squares/square.png';
import check_square from '@/assets/icons/squares/check-square.png';

const { isAgreeForm } = checkoutForm();
const { isAgreeFormError } = checkoutErrors();
const { toggleAgree, continueToOrder, price, totalPrice, commissionPrice } = useProfile();

watch(() => isAgreeFormError.value.agreeError, (agreeError) => {
  if(agreeError === true) {
    isAgreeForm.value.agreeMessage = '';
  }
})
</script>

<style scoped>

</style>