<template>
  <div class="font-raleway flex min-h-screen w-full items-center justify-center bg-[#F0F0F0]">
    <div class="flex flex-col items-center gap-7">
      <img :src="success" alt="" />
      <h1 class="text-5xl font-semibold">
        {{ t("paymentSuccess.title") }}
      </h1>
      <span class="w-110 text-center font-medium text-[#555]">
        {{ t("paymentSuccess.thanks") }}
      </span>
      <div class="flex w-180 flex-col gap-5 border-2 bg-white p-7">
        <div class="flex flex-col gap-7 border-b-2 border-[#ccc] pb-7">
          <div class="flex items-center">
            <h3 class="text-xl font-semibold">{{ t("paymentSuccess.orderSummary") }}</h3>
            <span class="font-dm-sans ml-auto text-[#555]">$ {{ price }}</span>
          </div>
          <div v-if="userPaymentCard" class="flex items-center text-[#555]">
            <span> {{ t("paymentSuccess.date") }}</span>
            <span class="font-dm-sans ml-auto">
              {{ userPaymentCard.created_at }}
            </span>
          </div>
          <div v-if="userPaymentCard" class="flex items-center text-[#555]">
            <span> {{ t("paymentSuccess.paymentMethod") }}</span>
            <span v-if="userPaymentCard.paymentMethod === 'card'" class="font-dm-sans ml-auto">
              {{ userPaymentCard.paymentMethod }}
            </span>
            <span v-else class="font-dm-sans ml-auto">{{ t("paymentSuccess.pay") }} {{ userPaymentCard.paymentMethod }}</span>
          </div>
          <div v-if="userAddress" class="flex items-center text-[#555]">
            <span> {{ t("paymentSuccess.deliveryAddress") }}</span>
            <span class="font-dm-sans ml-auto">
              {{ userAddress.address }}
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-3.5">
          <div class="flex items-center gap-3.5 text-sm text-[#555]">
            <span> {{ t("paymentSuccess.commission") }}</span>
            <span class="font-dm-sans"> $ {{ commissionPrice }} </span>
          </div>
          <div class="flex items-center">
            <h2 class="text-xl font-semibold">{{ t("paymentSuccess.totalPaid") }}</h2>
            <span class="font-dm-sans ml-auto"> $ {{ totalPrice }} </span>
          </div>
        </div>
      </div>
      <div class="mt-7 flex items-center gap-6">
        <router-link :to="{ name: 'profile' }">
          <UiButton :name="t('paymentSuccess.viewOrders')" variant="viewMyOrders" @click="closeSuccessFull" />
        </router-link>
        <router-link :to="{ name: 'shop' }">
          <UiButton :name="t('paymentSuccess.continueShopping')" variant="paymentSuccess" @click="closeSuccessFull" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { closeSuccessFull } from "@/features/payment-success/lib/toggle-success-payment";
import { orderPriceInfo } from "@/features/checkout-order-info/lib/order-price-info";
import { useSavedAddressData } from "@/widgets/user-address-list/lib/use-saved-address-data";
import { useSavedPaymentData } from "@/widgets/user-payment-card-list/lib/use-saved-payment-data";
import { UiButton } from "@/shared/ui/button";

import success from "@/assets/icons/checkout/payment/success.svg";

const { t } = useI18n();
const { userAddress } = useSavedAddressData();
const { userPaymentCard } = useSavedPaymentData();
const { price, commissionPrice, totalPrice } = orderPriceInfo();
</script>
