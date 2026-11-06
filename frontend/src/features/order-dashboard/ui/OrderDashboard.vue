<template>
  <div class="font-raleway fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
    <main class="flex h-full w-full flex-col bg-white p-5">
      <router-link :to="{ name: 'profile' }" class="ml-auto">
        <UiButton :name="t('common.exit')" variant="exitClose" />
      </router-link>
      <header class="mb-4 flex flex-col border-b py-4">
        <h1 class="text-2xl font-bold">{{ t("profile.modal.allOrders") }}</h1>
        <div class="flex items-center">
          <span class="text-sm text-[#A3A3A3]">
            {{ t("profile.modal.ordersHint") }}
          </span>
          <div class="ml-auto flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm">
            <span class="text-[#A3A3A3]">
              {{ t("orders.orderItems") }}
            </span>
            <span class="font-dm-sans font-bold text-black">{{ props.orders.length }}</span>
          </div>
        </div>
      </header>
      <Transition name="view" mode="out-in">
        <div class="no-scrollbar min-h-0 flex-1 overflow-y-auto">
          <Loader v-if="props.isLoading" variant="orders" />
          <ErrorState v-else-if="props.isError" variant="orders" :loading="props.isFetching" @reload="emit('refetch')" />
          <OrderList v-else-if="props.orders.length" :orders="props.orders" />
          <EmptyState v-else variant="orders" :loading="props.isFetching" @reload="emit('refetch')" />
        </div>
      </Transition>
      <Transition name="modal">
        <Clipboard v-if="clipboard" />
      </Transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useOrder } from "@/entities/order-item/lib/use-order";
import { UiButton } from "@/shared/ui/button";
import { Clipboard } from "@/widgets/clipboard";
import { OrderList } from "@/widgets/order-list";
import { EmptyState, ErrorState, Loader } from "@/widgets/state";
import type { OrderProps } from "@/entities/order";

const props = defineProps<{
  orders: OrderProps[],
  isLoading: boolean,
  isFetching: boolean,
  isError: boolean
}>()

const emit = defineEmits<{
  refetch: []
}>()

const { t } = useI18n();
const { clipboard } = useOrder();
</script>
