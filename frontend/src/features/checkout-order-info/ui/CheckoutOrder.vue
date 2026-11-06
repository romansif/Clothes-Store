<template>
  <div class="px-4 sm:px-4 md:px-5 lg:w-75 xl:w-100">
    <div class="flex">
      <h1 class="mt-2.5 font-medium">{{ t("checkout.yourOrder") }}</h1>
      <span class="ml-auto bg-white px-2 py-1">
        (
        <span class="font-dm-sans font-medium text-blue-700">
          {{ checkoutItems.length || 0 }}
        </span>
        )
      </span>
    </div>
    <CheckoutOrderList :order-items="checkoutItems" />
    <div class="mt-5 border-b border-gray-300"></div>
    <div class="mt-3 flex flex-col gap-2 text-xs font-medium">
      <div class="flex justify-between">
        <span>{{ t("checkout.subtotal") }}</span>
        <span class="font-dm-sans">$ {{ price }}</span>
      </div>
      <div class="flex items-center">
        <span>{{ t("checkout.shipping") }}</span>
        <div class="ml-auto flex gap-2">
          <span v-if="checkoutSession.delivery" class="font-dm-sans text-gray-400">
            {{ checkoutSession.delivery }} · $ {{ ship }}
          </span>
          <span v-else class="text-gray-400">{{ t("checkout.calculatedNext") }}</span>
        </div>
      </div>
    </div>
    <div class="mt-3 mb-1 border-b border-gray-300"></div>
    <span class="font-dm-sans text-xs text-[#A3A3A3]">
      {{ t("checkout.commission", { price: commissionPrice }) }}
    </span>
    <div class="mt-3 flex justify-between text-sm font-medium">
      <span>{{ t("checkout.total") }}</span>
      <span class="font-dm-sans"> $ {{ totalPrice }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCheckoutItems } from "@/features/checkout-order-info/lib/use-checkout-items";
import { orderPriceInfo } from "@/features/checkout-order-info/lib/order-price-info";
import { checkoutSession } from "@/entities/checkout-session/model/checkout-session";
import { CheckoutOrderList } from "@/widgets/checkout-order-list";

const { t } = useI18n();
const { checkoutItems } = useCheckoutItems();
const { price, totalPrice, commissionPrice, ship } = orderPriceInfo();
</script>
