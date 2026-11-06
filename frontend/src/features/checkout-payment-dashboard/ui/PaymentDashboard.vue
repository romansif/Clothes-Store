<template>
  <Loading v-if="isPending" />
  <div class="flex flex-col lg:w-100 xl:w-125">
    <SavedCheckoutPayment v-if="isSavedPayment" />
    <div v-else class="mt-8 flex flex-col gap-5">
      <div class="flex justify-between">
        <label class="text-xs font-medium md:text-sm">{{ t("checkout.paymentMethods") }}</label>
        <span
          v-if="havePayments(userPaymentCards)"
          class="cursor-pointer text-xs text-indigo-600 hover:text-violet-600"
          @click="toggleShowPayment()"
        >
          {{ t("checkout.showSavedPayment") }}
        </span>
      </div>
      <div class="flex gap-3">
        <form
          @submit.prevent="placeOrder({ useSaved: false })"
          action=""
          class="font-dm-sans flex w-full flex-col gap-4"
        >
          <PaymentMethodsForm
            :user-payment="userPaymentCard"
            :is-debit-card="isDebitCard"
            @open-card-form="openCardForm"
            @close-card-form="closeCardForm"
          />
          <div class="relative mt-5 transition duration-400 hover:scale-110 sm:ml-auto">
            <UiButton v-if="!isSavedPayment" type="submit" :name="t('checkout.pay')" variant="checkOut" />
            <img
              :src="arrow"
              alt=""
              class="absolute top-1/2 left-75 h-13 -translate-y-1/2 sm:left-60 md:left-75 lg:left-34 xl:left-46"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="relative mt-5 transition duration-400 hover:scale-110 sm:ml-auto">
      <UiButton
        v-if="isSavedPayment"
        :name="t('checkout.pay')"
        variant="checkOut"
        @click="placeOrder({ useSaved: false })"
      />
      <img
        :src="arrow"
        alt=""
        class="absolute top-1/2 left-75 h-13 -translate-y-1/2 sm:left-60 md:left-75 lg:left-34 xl:left-46"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { havePayments } from "@/shared/lib/use-payment-card";
import { usePlaceOrder } from "@/features/checkout-payment-dashboard/api/place-order";
import { togglePaymentForm } from "@/features/checkout-payment-dashboard/lib/toggle-payment";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { useSavedPaymentsData, useSavedPaymentData } from "@/widgets/user-payment-card-list/lib/use-saved-payment-data";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment-form/model/payment-form";
import { isSavedPayment } from "@/entities/checkout-payment-item/model/payment.refs";
import { UiButton } from "@/shared/ui/button";
import { PaymentMethodsForm } from "@/entities/checkout-payment-form";
import { SavedCheckoutPayment } from "@/features/checkout-payment-dashboard";
import { Loading } from "@/widgets/state";

import arrow from "@/assets/icons/arrows/right-shop.svg";

const { t } = useI18n();
const { placeOrder, isPending } = usePlaceOrder();
const { userPaymentCard } = useSavedPaymentData();
const { userPaymentCards } = useSavedPaymentsData();
const { openCardForm, closeCardForm, toggleShowPayment, isDebitCard } = togglePaymentForm();

refClearErrorsOnChange(paymentForm, paymentFormErrorMessage);
</script>
