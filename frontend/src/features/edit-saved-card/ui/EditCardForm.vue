<template>
  <form action="" class="flex flex-col gap-5 mt-5 font-medium w-full"
        @submit.prevent="updateCard()">
    <div class="flex flex-col gap-2.5">
      <div class="flex gap-1.5 font-dm-sans">
        <h2>{{ t('checkout.editCard.cardName') }}</h2>
        <span>-</span>
        <h3>{{ userPaymentCard?.cardName }}</h3>
      </div>
      <UiInput variant="editCard"
               v-model="paymentForm.cardName"
               :placeholder="t('checkout.editCard.cardNamePh')" />
    </div>
    <div class="flex flex-col gap-2.5">
      <div class="flex gap-1.5 font-dm-sans">
        <h2>{{ t('checkout.card.cardNumber') }}</h2>
        <span>-</span>
        <h3>{{ userPaymentCard?.cardNumber }}</h3>
      </div>
      <IMask
          v-model:value="paymentForm.cardNumber"
          :placeholder="t('checkout.editCard.cardNumberPh')"
          :class="[cardNumberClass, paymentFormErrorMessage.cardNumber ? paymentCardErrorClass : '']"
          :mask="cardNumberMask.mask"
      />
    </div>
    <div class="flex flex-col gap-2.5">
      <div class="flex gap-1.5 font-dm-sans">
        <h2>{{ t('checkout.card.expiry') }}</h2>
        <span>-</span>
        <h3>{{ userPaymentCard?.expiryDate }}</h3>
      </div>
      <IMask
          v-model:value="paymentForm.expiryDate"
          :placeholder="t('checkout.editCard.expiryPh')"
          :class="[expiryDateClass, paymentFormErrorMessage.expiryDate ? paymentCardErrorClass : '']"
          :mask="expiryDateMask.mask"
      />
    </div>
    <UiButton type="submit"
              :name="t('checkout.editAddress.edit')"
              variant="editAddress&Card" />
  </form>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { IMaskComponent as IMask } from "vue-imask";
import { useSavedPaymentData } from "@/widgets/user-payment-card-list";
import { useUpdateCard } from "@/features/edit-saved-card";
import { paymentForm, paymentFormErrorMessage} from "@/entities/checkout-payment-form";
import { UiButton } from "@/shared/ui/button";
import { UiInput } from "@/shared/ui/input";
import { cardNumberClass, expiryDateClass, paymentCardErrorClass } from "@/shared/model";
import { cardNumberMask, expiryDateMask } from "@/entities/checkout-payment-form";

const { t } = useI18n()
const { updateCard } = useUpdateCard()
const { userPaymentCard } = useSavedPaymentData()
</script>

