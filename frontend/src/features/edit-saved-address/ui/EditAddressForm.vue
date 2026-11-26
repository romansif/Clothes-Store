<template>
  <form action="" class="flex flex-col gap-5"
        @submit.prevent="updateAddress()">
    <div class="grid grid-cols-2 gap-x-10 gap-y-2.5 mt-5 font-medium w-full">
      <div class="flex flex-col gap-2.5">
        <div class="flex gap-1.5 font-dm-sans">
          <h2>{{ t('checkout.editAddress.addressName') }}</h2>
          <span>-</span>
          <h3>{{ userAddress?.addressName }}</h3>
        </div>
        <UiInput variant="editAddress"
                 v-model="informationForm.addressName"
                 :placeholder="t('checkout.editAddress.addressNamePh')"
                 :error-message="informationFormErrorMessages.address" />
      </div>
      <div class="flex flex-col gap-2.5">
        <div class="flex gap-1.5 font-dm-sans">
          <h2>{{ t('checkout.address.country') }}</h2>
          <span>-</span>
          <h3>{{ userAddress?.country }}</h3>
        </div>
        <UiInput variant="editAddress"
                 v-model="informationForm.country"
                 :placeholder="t('checkout.editAddress.countryPh')"
                 :error-message="informationFormErrorMessages.country" />
      </div>
      <div class="flex flex-col gap-2.5">
        <div class="flex gap-1.5 font-dm-sans">
          <h2>{{ t('checkout.address.state') }}</h2>
          <span>-</span>
          <h3>{{ userAddress?.stateRegion }}</h3>
        </div>
        <UiInput variant="editAddress"
                 v-model="informationForm.stateRegion"
                 :placeholder="t('checkout.editAddress.statePh')"
                 :error-message="informationFormErrorMessages.stateRegion" />
      </div>
      <div class="flex flex-col gap-2.5">
        <div class="flex gap-1.5 font-dm-sans">
         <h2>{{ t('checkout.address.address') }}</h2>
          <span>-</span>
          <h3>{{ userAddress?.address }}</h3>
        </div>
        <UiInput variant="editAddress"
                 v-model="informationForm.address"
                 :placeholder="t('checkout.editAddress.addressPh')"
                 :error-message="informationFormErrorMessages.address" />
      </div>
      <div class="flex flex-col gap-2.5">
        <div class="flex gap-1.5 font-dm-sans">
          <h2>{{ t('checkout.address.city') }}</h2>
          <span>-</span>
          <h3>{{ userAddress?.city }}</h3>
        </div>
        <UiInput variant="editAddress"
                 v-model="informationForm.city"
                 :placeholder="t('checkout.editAddress.cityPh')"
                 :error-message="informationFormErrorMessages.city" />
      </div>
      <div class="flex flex-col gap-2.5">
        <div class="flex gap-1.5 font-dm-sans">
          <h2>{{ t('checkout.address.postalCode') }}</h2>
          <span>-</span>
          <h3>{{ userAddress?.postalCode }}</h3>
        </div>
        <UiInput variant="editAddress"
                 v-model="informationForm.postalCode"
                 :placeholder="t('checkout.editAddress.postalCodePh')"
                 :error-message="informationFormErrorMessages.postalCode" />
      </div>
    </div>
    <UiButton type="submit"
              :name="t('checkout.editAddress.edit')"
              variant="editAddress&Card" />
  </form>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useUpdateAddress } from "@/features/edit-saved-address";
import { useSavedAddressData } from "@/widgets/user-address-list";
import { informationForm, informationFormErrorMessages } from "@/entities/checkout-info-form";
import { UiButton } from "@/shared/ui/button";
import { UiInput } from "@/shared/ui/input";

const { t } = useI18n()
const { updateAddress } = useUpdateAddress()
const { userAddress } = useSavedAddressData()
</script>

