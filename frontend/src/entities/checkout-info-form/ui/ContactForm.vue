<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <CheckoutInput
        v-model="informationForm.firstName"
        :placeholder="t('checkout.contact.firstName')"
        :error-message="informationFormErrorMessages.firstName"
      />
      <CheckoutInput
        v-model="informationForm.lastName"
        :placeholder="t('checkout.contact.lastName')"
        :error-message="informationFormErrorMessages.lastName"
      />
    </div>
    <CheckoutInput v-model="informationForm.email" :placeholder="t('checkout.contact.email')" :error-message="informationFormErrorMessages.email" />
    <UiPhoneInput
      v-model="informationForm.phone"
      :select-class="informationSelectPhoneCodeClass"
      :input-class="[informationPhoneClass.default, informationFormErrorMessages.phone ? informationPhoneClass.error : '']"
      :error-message="informationFormErrorMessages.phone"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { informationForm, informationFormErrorMessages } from "@/entities/checkout-info-form/model/information-form";
import { informationPhoneClass, informationSelectPhoneCodeClass } from "@/entities/checkout-info-form/model/information-form.variants";
import { CheckoutInput } from "@/shared/ui/checkout-input";
import { UiPhoneInput } from "@/shared/ui/phone-input";

const { t } = useI18n();
</script>
