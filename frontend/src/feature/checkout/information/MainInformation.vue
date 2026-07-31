<script setup lang="ts">
import { watch } from "vue";
import { useAddCheckout } from "../composables/use-add-checkout.ts";
import { checkoutForms } from "@/shared/composables/forms/checkout.forms.ts";
import { checkoutErrors }from "@/shared/composables/errors/errors-messages/checkout.errors.ts";

import arrow from "@/app/assets/icons/arrows/shop.svg";
import BaseButton from "@/shared/ui/button/BaseButton.vue";
import ContactInfo from "./information-items/ContactInfo.vue";
import AddressInfo from "./information-items/AddressInfo.vue";

const { addAddress } = useAddCheckout();
const { information } = checkoutForms();
const { informationErrors } = checkoutErrors();

watch(() => [
  information.value.email, information.value.phone, information.value.firstName, information.value.lastName,
  information.value.country, information.value.stateRegion, information.value.address, information.value.city,
  information.value.postalCode], ([email, phone, firstName, lastName, country, stateRegion, address, city , postalCode]) => {

  if(email){
    informationErrors.value.emailError = false;
  }
  if(phone){
    informationErrors.value.phoneError = false;
  }
  if(firstName){
    informationErrors.value.firstNameError = false;
  }
  if(lastName){
    informationErrors.value.lastNameError = false;
  }
  if(country){
    informationErrors.value.countryError = false;
  }
  if(stateRegion){
    informationErrors.value.stateRegionError = false;
  }
  if(address){
    informationErrors.value.addressError = false;
  }
  if(city){
    informationErrors.value.cityError = false;
  }
  if(postalCode){
    informationErrors.value.postalCodeError = false;
  }
});

</script>

<template>
  <div class="flex flex-col lg:w-[400px] xl:w-[500px]">
    <ContactInfo />
    <AddressInfo />
      <div class="relative mt-5 ml-auto">
        <BaseButton @click="addAddress" name="Shipping" variant="checkOut"/>
        <img :src=arrow alt="" class="h-13 absolute left-70 top-1/2 -translate-y-1/2
            sm:left-60 md:left-75 lg:left-34 xl:left-46">
      </div>
  </div>
</template>

<style scoped>

</style>