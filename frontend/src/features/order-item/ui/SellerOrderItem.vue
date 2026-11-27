<template>
  <li class="flex h-fit flex-col gap-5 rounded-xl border-b border-gray-300 bg-white p-3">
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-2.5">
        <h4 class="text-lg text-[#A3A3A3]">{{ t("orders.order") }}</h4>
        <span class="font-dm-sans text-lg font-semibold">№ {{ props.sellerItem.id.slice(0, 8) }}</span>
      </div>
      <span :class="orderStatusVariants(props.sellerItem.status)">
        {{ t(`orders.status.${props.sellerItem.status}`) }}
      </span>
    </div>
    <div class="flex gap-5">
      <img :src="orderPreview(sellerItem).value" alt="" class="h-50 w-40 rounded-2xl" />
      <div class="flex flex-col gap-2.5">
        <h1 class="text-2xl">{{ sellerItem.title }}</h1>
        <span class="text-sm text-[#A3A3A3] uppercase">{{ sellerItem.sku }}</span>
        <div class="flex items-center gap-2.5">
          <span class="rounded-2xl border border-[#A3A3A3] px-2.5 py-1.5">{{ sellerItem.size }}</span>
          <div class="flex items-center gap-1.5 rounded-2xl border border-[#A3A3A3] px-2.5 py-1.5">
            <span>{{ sellerItem.color.colorName }}</span>
            <span
              class="inline-block h-5 w-5 shrink-0 rounded-full border border-black/15"
              :style="{ background: sellerItem.color.hex }"
            ></span>
          </div>
          <span class="font-dm-sans rounded-2xl border border-[#A3A3A3] px-3.5 py-1.5">x{{ sellerItem.quantity }}</span>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-5 text-lg">
      <div class="flex gap-2.5">
        <h2 class="text-[#A3A3A3] uppercase">{{ t("orders.category") }}</h2>
        <h2>{{ sellerItem.category }}</h2>
      </div>
      <div class="flex gap-2.5">
        <h2 class="text-[#A3A3A3] uppercase">{{ t("orders.material") }}</h2>
        <h2>{{ sellerItem.material }}</h2>
      </div>
      <div class="flex gap-2.5">
        <h2 class="text-[#A3A3A3] uppercase">{{ t("orders.gender") }}</h2>
        <h2>{{ sellerItem.gender }}</h2>
      </div>
      <div class="flex gap-2.5">
        <h2 class="text-[#A3A3A3] uppercase">{{ t("orders.delivery") }}:</h2>
        <h2>{{ sellerItem.order.delivery }}</h2>
      </div>
    </div>
    <div class="font-dm-sans flex justify-between rounded-2xl bg-[#F0F0F0] px-5 py-3">
      <div class="flex flex-col items-center gap-2.5">
        <span class="text-[#A3A3A3]">{{ t("orders.price") }}</span>
        <span class="text-lg font-medium">$ {{ sellerItem.price }}</span>
      </div>
      <div class="flex flex-col items-center gap-2.5">
        <span class="text-[#A3A3A3]">{{ t("orders.qty") }}</span>
        <span class="text-lg font-medium">{{ t("common.pcs", sellerItem.quantity) }}</span>
      </div>
      <div class="flex flex-col gap-2.5">
        <span class="text-end text-[#A3A3A3]">{{ t("orders.total") }}</span>
        <span class="text-2xl font-semibold">$ {{ sellerItem.total_price }}</span>
      </div>
    </div>
    <div v-if="sellerItem.status !== 'Cancelled'" class="flex items-stretch gap-2.5">
      <div
        v-if="sellerItem.status === 'Delivered'"
        class="flex flex-1 items-center justify-center gap-2.5 rounded-xl border border-teal-900 bg-teal-100 px-5 py-3 font-semibold text-teal-900"
      >
        <img :src="success" alt="" class="h-5 w-5 shrink-0" />
        <span>{{ t(`${orderSetStatus(sellerItem)}`) }}</span>
      </div>
      <div v-else class="flex flex-1 gap-5">
        <UiButton
          :name="t(orderSetStatus(sellerItem))"
          variant="acceptStatus"
          @click="emit('updateOrderStatus', sellerItem)"
        />
      </div>
      <router-link :to="{ name: 'my/products' }" class="flex shrink-0">
        <UiButton :name="t('orders.details')" variant="sellerItemDetails" />
      </router-link>
    </div>
    <div v-else class="flex flex-col gap-5">
      <div class="flex flex-col gap-2.5 rounded-xl border border-rose-900 bg-rose-100 px-5 py-3 font-medium">
        <h3 class="text-sm tracking-wide text-rose-900 uppercase">{{ t("orders.causeReplace") }}</h3>
        <span class="text-lg">{{ sellerItem.cause_replace }}</span>
        <OrderStatus :item="sellerItem" />
      </div>
      <router-link :to="{ name: 'my/products' }" class="flex">
        <UiButton :name="t('orders.details')" variant="sellerItemDetails" />
      </router-link>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useOrder } from "@/features/order-item";
import { orderStatusVariants } from "@/features/order-item";
import { UiButton } from "@/shared/ui/button";
import { OrderStatus } from "@/entities/order";
import type { SellerOrderProps } from "@/shared/model";

import success from "@/assets/icons/checkout/payment/success.svg";

const props = defineProps<{
  sellerItem: SellerOrderProps;
}>();

const emit = defineEmits<{
  updateOrderStatus: [item: SellerOrderProps];
}>();

const { t } = useI18n();
const { orderPreview, orderSetStatus } = useOrder();
</script>
