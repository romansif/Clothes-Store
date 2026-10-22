<template>
  <div class="flex flex-col lg:w-100 xl:w-125">
    <SavedCheckoutInfo v-if="isSavedAddress"/>
    <form v-else class="flex flex-col mt-5 gap-5"
          @submit.prevent="addInformation">
      <div v-if="userAddresses.length > 0 && !isSavedAddress"
           class="flex justify-between">
        <label class="font-medium text-xs md:text-sm">
          CONTACT INFO
        </label>
        <span @click="toggleShowContact"
              class="text-xs text-indigo-600 cursor-pointer hover:text-violet-600">
          Show saved contact
        </span>
      </div>
      <ContactForm />
      <AddressForm />
      <div class="relative ml-auto mt-5 transition duration-400 hover:scale-110">
        <UiButton v-if="!isSavedAddress"
                    type="submit"
                    name="Shipping"
                    variant="checkOut"/>
        <img :src=arrow alt=""
             class="h-13 absolute left-70 top-1/2 -translate-y-1/2
             sm:left-60 md:left-75 lg:left-34 xl:left-46">
      </div>
    </form>
    <div class="relative ml-auto mt-5 transition duration-400 hover:scale-110">
      <UiButton v-if="isSavedAddress"
                  name="Shipping"
                  variant="checkOut"
                  @click="useInformation" />
      <img :src=arrow alt=""
           class="h-13 absolute left-70 top-1/2 -translate-y-1/2
           sm:left-60 md:left-75 lg:left-34 xl:left-46">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddAddress } from "@/features/use-checkout-contact-info/api/add-address";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { toggleInformation } from "@/features/use-checkout-contact-info/lib/toggle-contact-info";
import { informationContactStore } from "@/features/use-user-address/model/address.store";
import { informationForm, informationFormErrorMessages } from "@/entities/checkout-contact-info/model/information-form";

import arrow from "@/assets/icons/arrows/right-shop.svg";

import { UiButton } from "@/shared/ui/button";
import { ContactForm } from "@/entities/checkout-contact-info";
import { AddressForm } from "@/entities/checkout-contact-info";
import { SavedCheckoutInfo } from "@/features/use-checkout-contact-info";

const { userAddresses } = informationContactStore();
const { addInformation, useInformation } = useAddAddress();
const { toggleShowContact, isSavedAddress } = toggleInformation();

refClearErrorsOnChange(
    informationForm,
    informationFormErrorMessages
)
</script>