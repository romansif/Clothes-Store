<template>
  <li class="flex flex-col overflow-hidden rounded-2xl border border-gray-300">
    <div class="flex border-b border-gray-300 bg-gray-100 p-4">
      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <span :class="orderStatus(order)">
            {{ props.order.status }}
          </span>
          <div class="flex items-center gap-2">
            <span class="font-dm-sans text-lg font-semibold">№ {{ props.order.id.slice(0, 8) }}</span>
            <div class="group relative">
              <img @click="copyText(props.order.id.slice(0, 8))" :src="copy_btn" alt="" class="w-5" />
              <span
                class="absolute max-w-200 min-w-38 rounded-xl bg-[rgba(0,0,0,0.8)] px-2 py-1 text-xs text-white opacity-0 transition duration-600 group-hover:opacity-100"
              >
                {{ t("orders.copyTracking") }}
              </span>
            </div>
          </div>
        </div>
        <OrderStatus :item="props.order" />
      </div>
      <div class="ml-auto flex items-center gap-2">
        <div class="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm">
          <span class="text-[#A3A3A3]">{{ t("orders.delivery") }}</span>
          <span class="font-dm-sans font-bold text-black">{{ props.order.delivery }}</span>
        </div>
        <div class="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm">
          <span class="text-[#A3A3A3]">
            {{ t("orders.totalItems") }}
          </span>
          <span class="font-dm-sans font-bold text-black">{{ orderItems.length }}</span>
        </div>
      </div>
    </div>
    <OrderItemList :order="props.order" />
    <div v-if="props.order.status !== 'Cancelled'" class="flex items-center bg-gray-100 p-4">
      <div class="flex flex-col gap-2 px-4 py-2">
        <span class="text-[#A3A3A3]">{{ t("orders.orderItems") }}</span>
        <span class="font-dm-sans font-bold text-black">$ {{ orderItemsPrice(orderItems) }}</span>
      </div>
      <div class="flex flex-col gap-2 px-4 py-2">
        <span class="text-[#A3A3A3]">{{ t("orders.commission") }} 8%</span>
        <span class="font-dm-sans font-bold text-black">$ {{ orderCommission(orderItems) }}</span>
      </div>
      <div v-if="props.order.delivery === 'express'" class="flex flex-col gap-2 px-4 py-2">
        <span class="text-[#A3A3A3]">{{ t("orders.delivery") }}</span>
        <span class="font-dm-sans font-bold text-black">{{ props.order.delivery }} $ 15</span>
      </div>
      <div v-else class="flex flex-col gap-2 px-4 py-2">
        <span class="text-[#A3A3A3]">{{ t("orders.delivery") }}</span>
        <span class="font-dm-sans font-bold text-black">$ 0</span>
      </div>
      <div class="ml-auto flex items-center gap-5">
        <div class="flex gap-2 px-4 py-2">
          <span class="text-lg text-[#A3A3A3]">{{ t("orders.total") }}</span>
          <span class="font-dm-sans text-xl font-bold text-black">$ {{ props.order.orderTotal }}</span>
        </div>
        <UiButton
          v-if="props.order.status !== 'Cancelled'"
          :name="t('orders.cancelOrder')"
          variant="useOrder"
          @click="openReplaceOrder(props.order.id)"
        />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useOrder } from "@/entities/order-item/lib/use-order";
import { useOrderItemsData } from "@/shared/lib/use-order-data";
import { ordersVariants } from "@/entities/order-item/model/orders.variants";
import { openReplaceOrder } from "@/entities/order-action/lib/order-modal";
import { OrderStatus } from "@/entities/order";
import { OrderItemList } from "@/widgets/order-item-list";
import { UiButton } from "@/shared/ui/button";
import type { OrderProps } from "@/entities/order";

import copy_btn from "@/assets/icons/squares/copy.svg";

const props = defineProps<{
  order: OrderProps;
  orders: OrderProps[];
}>();

const { t } = useI18n();
const { orderStatus } = ordersVariants();
const { orderItems } = useOrderItemsData(props.order.id);
const { copyText, orderItemsPrice, orderCommission } = useOrder();
</script>
