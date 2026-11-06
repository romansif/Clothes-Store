<template>
  <div class="flex gap-2">
    <div class="flex w-full flex-col gap-2">
      <label class="text-sm">{{ t("checkout.card.cardName") }}</label>
      <CheckoutInput
        v-model="paymentForm.cardName"
        :placeholder="'Card Name is optional'"
        variant="payment"
        :error-message="''"
      />
    </div>
    <div class="flex w-full flex-col gap-2">
      <label class="text-sm">{{ t("checkout.card.cardNumber") }}</label>
      <IMask
        v-model:value="paymentForm.cardNumber"
        placeholder="XXXX-XXXX-XXXX-XXXX"
        :class="[cardNumberClass, paymentFormErrorMessage.cardNumber ? paymentCardErrorClass : '']"
        :mask="cardNumberMask.mask"
      />
      <span v-if="paymentFormErrorMessage.cardNumber" class="text-xs text-red-600">
        {{ paymentFormErrorMessage.cardNumber }}
      </span>
    </div>
  </div>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2">
      <label class="text-sm">{{ t("checkout.card.expiry") }}</label>
      <IMask
        v-model:value="paymentForm.expiryDate"
        placeholder="MM / YY"
        :class="[expiryDateClass, paymentFormErrorMessage.expiryDate ? paymentCardErrorClass : '']"
        :mask="expiryDateMask.mask"
      />
      <span v-if="paymentFormErrorMessage.expiryDate" class="text-xs text-red-600">
        {{ paymentFormErrorMessage.expiryDate }}
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm">{{ t("checkout.card.cvv") }}</label>
      <IMask
        v-model:value="paymentForm.cardCvv"
        placeholder="••••"
        :class="[cardCvvClass, paymentFormErrorMessage.cardCvv ? paymentCardErrorClass : '']"
        :mask="cardCvvMask.mask"
      />
      <span v-if="paymentFormErrorMessage.cardCvv" class="text-xs text-red-600">
        {{ paymentFormErrorMessage.cardCvv }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { IMaskComponent as IMask } from "vue-imask";
import { cardNumberMask, expiryDateMask, cardCvvMask } from "@/entities/checkout-payment-form/model/payment-mask";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment-form/model/payment-form";
import {
  cardNumberClass,
  expiryDateClass,
  cardCvvClass,
  paymentCardErrorClass,
} from "@/shared/model/payment-form.variants";
import { CheckoutInput } from "@/shared/ui/checkout-input";

const { t } = useI18n();
</script>
