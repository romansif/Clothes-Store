<template>
  <div class="flex flex-col lg:w-100 xl:w-125">
    <div v-if="!isSavedAddress">
      <ContactForm />
      <AddressForm />
    </div>
    <SavedCheckoutInfo v-if="isSavedAddress"/>
    <div class="relative ml-auto mt-5 transition duration-400 hover:scale-110">
      <BaseButton v-if="!isSavedAddress" @click="addInformation" name="Shipping" variant="checkOut"/>
      <BaseButton v-if="isSavedAddress" @click="useInformation" name="Shipping" variant="checkOut"/>
      <img :src=arrow alt="" class="h-13 absolute left-70 top-1/2 -translate-y-1/2
          sm:left-60 md:left-75 lg:left-34 xl:left-46">
    </div>
  </div>
</template>

<script setup lang="ts">
const { isSavedAddress } = checkoutApi();
const { information } = checkoutForms();
const { informationErrors } = checkoutErrors();
const { addInformation, useInformation } = adressApi();

import { watch } from "vue";
import { adressApi } from "@/feature/checkout/api/adress.api.ts";
import { checkoutForms } from "@/feature/checkout/model/checkout.forms.ts";
import { checkoutErrors }from "@/feature/checkout/lib/checkout.errors.ts";
import { checkoutApi } from "@/feature/checkout/api/checkout.api.ts";

import arrow from "@/app/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import ContactForm from "@/feature/checkout/ui/ContactForm.vue";
import AddressForm from "@/feature/checkout/ui/AddressForm.vue";
import SavedCheckoutInfo from "@/feature/checkout/ui/SavedCheckoutInfo.vue";

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

<style scoped>

</style>