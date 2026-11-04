<template>
  <label class="text-xs font-medium md:text-sm">{{ t("checkout.shippingAddress") }}</label>
  <div class="flex flex-col gap-3">
    <CheckoutInput v-model="informationForm.addressName"
                   :placeholder="t('checkout.address.namePh')" />
    <div class="flex flex-col gap-3">
      <CheckoutInput v-model="informationForm.country"
                     :placeholder="t('checkout.address.country')"
                     :error-message="informationFormErrorMessages.country" />
      <CheckoutInput v-model="informationForm.stateRegion"
                     :placeholder="t('checkout.address.state')"
                     :error-message="informationFormErrorMessages.stateRegion" />
      <CheckoutInput v-model="informationForm.address"
                     :placeholder="t('checkout.address.address')"
                     :error-message="informationFormErrorMessages.address" />
    </div>
    <div class="flex gap-2">
      <div class="flex w-full flex-col">
        <CheckoutInput v-model="informationForm.city"
                       :placeholder="t('checkout.address.city')"
                       :error-message="informationFormErrorMessages.city" />
      </div>
      <div class="flex w-full flex-col">
        <IMask
          v-model:value="informationForm.postalCode"
          :placeholder="t('checkout.address.postalCode')"
          :class="[postalCodeClass.default, informationFormErrorMessages.postalCode ? postalCodeClass.default : '']"
          :mask="postalCode.mask"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IMaskComponent as IMask } from "vue-imask";
import { postalCode } from "@/entities/checkout-info-form/model/information-mask";
import { postalCodeClass } from "@/entities/checkout-info-form/model/information-form.variants";
import { informationForm, informationFormErrorMessages } from "@/entities/checkout-info-form/model/information-form";
import { CheckoutInput } from "@/shared/ui/checkout-input";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
