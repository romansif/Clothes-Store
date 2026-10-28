<template>
  <div class="flex flex-col lg:w-100 xl:w-125">
    <SavedCheckoutPayment v-if="isSavedPayment"/>
    <div v-else class="flex flex-col mt-8 gap-5">
      <div class="flex justify-between">
        <label class="font-medium text-xs md:text-sm">
          PAYMENT METHODS
        </label>
        <span v-if="havePayments(userPaymentCards)"
              class="text-xs text-indigo-600 cursor-pointer hover:text-violet-600"
              @click="toggleShowPayment()">
          Show saved payment
        </span>
      </div>
      <div class="flex gap-3">
        <form @submit.prevent="createPayment({products, cart})" action=""
              class="flex flex-col gap-4 w-full font-dm-sans">
          <PaymentMethodsForm :user-payment="userPaymentCard"
                              :is-debit-card="isDebitCard"
                              @open-card-form="openCardForm"
                              @close-card-form="closeCardForm" />
          <div class="relative mt-5 sm:ml-auto transition duration-400 hover:scale-110">
            <UiButton v-if="!isSavedPayment"
                      type="submit"
                      name="Pay"
                      variant="checkOut"/>
            <img :src=arrow alt=""
                 class="h-13 absolute left-75 top-1/2 -translate-y-1/2
                 sm:left-60 md:left-75 lg:left-34 xl:left-46">
          </div>
        </form>
      </div>
    </div>
    <div class="relative mt-5 sm:ml-auto transition duration-400 hover:scale-110">
      <UiButton v-if="isSavedPayment"
                name="Pay"
                variant="checkOut"
                @click="addPayment({products, cart})" />
      <img :src=arrow alt=""
           class="h-13 absolute left-75 top-1/2 -translate-y-1/2
           sm:left-60 md:left-75 lg:left-34 xl:left-46">
    </div>
  </div>
</template>

<script setup lang="ts">
import { havePayments } from "@/shared/lib/use-payment-card";
import { useCartData } from "@/widgets/cart-list/lib/use-cart-data";
import { useProductsData } from "@/widgets/product-list/lib/use-product-data";
import { useAddPayment, useCreatePayment } from "@/features/checkout-payment-dashboard/api/add-payment";
import { togglePaymentForm } from "@/features/checkout-payment-dashboard/lib/toggle-payment";
import { refClearErrorsOnChange } from "@/shared/lib/errors-helper";
import { useSavedPaymentsData, useSavedPaymentData} from "@/widgets/user-payment-card-list/lib/use-saved-payment-data";
import { paymentForm, paymentFormErrorMessage } from "@/entities/checkout-payment-form/model/payment-form";
import { isSavedPayment } from "@/entities/checkout-payment-item/model/payment.refs";
import { UiButton } from "@/shared/ui/button";
import { PaymentMethodsForm } from "@/entities/checkout-payment-form";
import { SavedCheckoutPayment } from "@/features/checkout-payment-dashboard";

import arrow from "@/assets/icons/arrows/right-shop.svg";

const { cart } = useCartData()
const { products } = useProductsData()
const { addPayment } = useAddPayment()
const { createPayment } = useCreatePayment()
const { userPaymentCard } = useSavedPaymentData()
const { userPaymentCards } = useSavedPaymentsData();
const { openCardForm, closeCardForm, toggleShowPayment, isDebitCard } = togglePaymentForm();

refClearErrorsOnChange(
  paymentForm,
  paymentFormErrorMessage
)
</script>
