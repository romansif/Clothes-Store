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
    <CheckoutInput
      v-model="informationForm.email"
      :placeholder="t('checkout.contact.email')"
      :error-message="informationFormErrorMessages.email"
    />
    <UiPhoneInput
      v-model="informationForm.phone"
      :select-class="INFORMATION_SELECT_PHONE_CLASS"
      :input-class="[
        INFORMATION_PHONE_CLASS.default,
        informationFormErrorMessages.phone ? INFORMATION_PHONE_CLASS.error : '',
      ]"
      :error-message="informationFormErrorMessages.phone"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { informationForm, informationFormErrorMessages } from "@/entities/checkout-info-form";
import {
  INFORMATION_PHONE_CLASS,
  INFORMATION_SELECT_PHONE_CLASS,
} from "@/entities/checkout-info-form";
import { CheckoutInput } from "@/shared/ui/checkout-input";
import { UiPhoneInput } from "@/shared/ui/phone-input";

const { t } = useI18n();
</script>
