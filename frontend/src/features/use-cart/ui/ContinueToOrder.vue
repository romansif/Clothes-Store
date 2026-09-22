<template>
  <div class="flex flex-col mt-2 xl:block">
    <div class="flex flex-col gap-4">
      <div class="flex gap-4 items-center">
        <img @click="toggleAgree" :src="isAgreeFormError.agree ? check_square : square" alt="" class="w-6.25 cursor-pointer">
        <span class="text-xs text-[#A3A3A3]">
          I agree to the Terms and Conditions
        </span>
      </div>
      <span class="text-red-600 text-xs">{{ isAgreeFormErrorMessage.agree }}</span>
    </div>
    <BaseButton @click="continueToOrder" name="CONTINUE" variant="addToOrder" />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useCartOrderInfo } from "@/features/use-cart/lib/cart-order-info.ts";
import { isAgreeFormError, isAgreeFormErrorMessage } from "@/entities/product/model/add.to.cart.form.ts";

import check_square from "@/assets/icons/squares/check-square.png";
import square from "@/assets/icons/squares/square.png";
import BaseButton from "@/shared/ui/base/BaseButton.vue";

const { toggleAgree, continueToOrder } = useCartOrderInfo();

watch(() => isAgreeFormError.value.agree, (agreeError) => {
  if(agreeError) {
    isAgreeFormErrorMessage.value.agree = '';
  }
})
</script>

<style scoped>

</style>