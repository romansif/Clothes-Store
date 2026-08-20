<template>
  <form class="flex flex-col mt-5 gap-5">
    <div class="flex justify-between">
      <label class="font-medium text-xs md:text-sm">
        SHIPPING ADDRESS
      </label>
      <span v-if="userAddresses" @click="toggleShowContact"
            class="text-xs text-indigo-600 cursor-pointer hover:text-violet-600">
        Show saved contact
      </span>
    </div>
    <div class="flex flex-col gap-3">
      <input v-model="information.addressName" type="text" placeholder="Address Name is optional" :class="addressNameClass()" />
      <div class="flex gap-2">
        <CheckoutInput v-model="information.firstName" type="text" variant="checkoutInfo"
            :placeholder="firstNamePlaceholder" :error="informationErrors.firstNameError" />
        <CheckoutInput v-model="information.lastName" type="text" variant="checkoutInfo"
            :placeholder="lastNamePlaceholder" :error="informationErrors.lastNameError" />
      </div>
      <div class="flex flex-col gap-3">
        <CheckoutInput v-model="information.country" type="text" variant="checkoutInfo"
             :placeholder="countryPlaceholder" :error="informationErrors.countryError" />
        <CheckoutInput v-model="information.stateRegion" type="text" variant="checkoutInfo"
            :placeholder="statePlaceholder" :error="informationErrors.stateRegionError"  />
        <CheckoutInput v-model="information.address" type="text" :placeholder="addressPlaceholder"
            :error="informationErrors.addressError" variant="checkoutInfo" />
      </div>
      <div class="flex gap-2">
        <div class="flex flex-col w-full">
          <CheckoutInput v-model="information.city" type="text" variant="checkoutInfo"
            :placeholder="cityPlaceholder" :error="informationErrors.cityError" />
        </div>
        <div class="flex flex-col w-full">
          <IMask v-model.value="information.postalCode" type="text" :placeholder="postalCodePlaceholder"
                 :class="postalCodeClass" :mask="postalCode.mask"  />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const { information } = checkoutForms();
const { toggleShowContact } = checkout();
const { informationErrors } = checkoutErrors();
const { postalCode, userAddresses } = usersStore();
const { addressNameClass, postalCodeClass } = informationClasses();
const {
  firstNamePlaceholder, lastNamePlaceholder, countryPlaceholder,
  statePlaceholder, addressPlaceholder, cityPlaceholder, postalCodePlaceholder
} = checkoutPlaceholder();

import { IMaskComponent as IMask } from "vue-imask";
import { checkout } from "@/feature/checkout/checkout-actions/checkout.ts";
import { usersStore } from "@/shared/composables/stores/users.store";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms";
import { checkoutErrors }from "@/shared/composables/errors/errors-messages/checkout.errors";
import { checkoutPlaceholder } from "@/feature/checkout/checkout-actions/checkout.placeholder.ts";
import { informationClasses } from "@/shared/composables/style/checkout-style/information.classes.ts";

import CheckoutInput from "@/shared/ui/base/input/CheckoutInput.vue";
</script>
<style scoped>

</style>
