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
import { watch } from "vue";
import { useAddAddress } from "@/features/use-checkout-contact-info/api/add-address.ts";
import { toggleInformation } from "@/features/use-checkout-contact-info/lib/toggle.information.ts";
import { informationForm } from "@/features/use-checkout-contact-info/model/address.form.ts";
import { informationFormErrors } from "@/features/use-checkout-contact-info/model/address.errors.ts";

import arrow from "@/assets/icons/arrows/right-shop.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import ContactForm from "@/features/use-checkout-contact-info/ui/ContactForm.vue";
import AddressForm from "@/features/use-checkout-contact-info/ui/AddressForm.vue";
import SavedCheckoutInfo from "@/features/use-checkout-contact-info/ui/SavedCheckoutInfo.vue";

const { isSavedAddress } = toggleInformation();
const { addInformation, useInformation } = useAddAddress();

watch(() => [
  informationForm.value.email, informationForm.value.phone, informationForm.value.firstName, informationForm.value.lastName,
  informationForm.value.country, informationForm.value.stateRegion, informationForm.value.address, informationForm.value.city,
  informationForm.value.postalCode], ([email, phone, firstName, lastName, country, stateRegion, address, city , postalCode]) => {

  if(email){
    informationFormErrors.value.email = false;
  }
  if(phone){
    informationFormErrors.value.phone = false;
  }
  if(firstName){
    informationFormErrors.value.firstName = false;
  }
  if(lastName){
    informationFormErrors.value.lastName = false;
  }
  if(country){
    informationFormErrors.value.country = false;
  }
  if(stateRegion){
    informationFormErrors.value.stateRegion = false;
  }
  if(address){
    informationFormErrors.value.address = false;
  }
  if(city){
    informationFormErrors.value.city = false;
  }
  if(postalCode){
    informationFormErrors.value.postalCode = false;
  }
});
</script>

<style scoped>

</style>