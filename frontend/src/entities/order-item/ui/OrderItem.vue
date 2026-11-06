<template>
  <li class="border-b border-gray-300">
    <div class="flex gap-5 px-4 py-8">
      <img
        v-if="item.images"
        :src="orderPreview(item).value"
        alt=""
        class="h-60 w-50 shrink-0 rounded transition duration-400 hover:scale-110"
      />
      <div class="flex min-w-0 flex-1 flex-col gap-5">
        <div class="flex flex-1 justify-between gap-10">
          <div class="flex min-w-0 flex-col gap-2.5">
            <div class="flex items-center gap-2.5">
              <span
                :class="[
                  'text-lg font-medium',
                  props.item.status === 'Cancelled' ? 'font-semibold text-[#A3A3A3] line-through' : 'text-black',
                ]"
                >{{ props.item.title }}</span>
              <span :class="orderStatus(props.item)">{{ props.item.status }}</span>
            </div>
            <span
              v-if="props.item.status !== 'Cancelled'"
              class="no-scrollbar max-h-30 max-w-170 overflow-y-auto text-sm break-all text-[#A3A3A3]"
            >
              {{ props.item.description }}
            </span>
            <div v-else class="flex flex-col gap-2.5 text-sm font-normal text-[#A3A3A3]">
              <OrderStatus :item="props.item" />
              <span class="text-sm text-[#A3A3A3]"> {{ t("orders.causeReplace") }} [ {{ props.item.cause_replace }} ] </span>
            </div>
          </div>
          <div class="flex flex-col gap-2.5">
            <OrderStatus v-if="props.item.status !== 'Cancelled'" :item="props.item" />
            <div
              :class="[
                'font-dm-sans ml-auto flex shrink-0 items-center gap-2.5',
                props.item.status === 'Cancelled' ? 'text-sm text-[#A3A3A3] line-through' : 'text-black',
              ]"
            >
              <span :class="['font-bold', props.item.status === 'Cancelled' ? 'text-sm font-medium' : 'text-xl']">
                $ {{ props.item.price }}
                <span class="text-sm text-[#A3A3A3]"> x {{ t("common.pcs", item.quantity) }} </span>
              </span>
            </div>
          </div>
        </div>
        <div class="mt-auto flex items-end">
          <div v-if="props.item.status !== 'Cancelled'" class="flex flex-col gap-5">
            <div class="flex items-center gap-5">
              <div class="flex items-center gap-1.5 rounded-lg bg-[#F0F0F0] px-3 py-1">
                <span>{{ t("orders.size") }}</span>
                <span class="font-semibold">
                  {{ props.item.size }}
                </span>
              </div>
              <div class="flex items-center gap-1.5 rounded-lg bg-[#F0F0F0] px-3 py-1">
                <span>{{ t("orders.color") }}</span>
                <span class="font-semibold">
                  {{ props.item.color.colorName }}
                </span>
                <span
                  class="h-5 w-5 rounded-full border border-[#A3A3A3]"
                  :style="{ background: props.item.color.hex }"
                ></span>
              </div>
            </div>
            <div class="flex items-center gap-5">
              <div class="flex items-center gap-1.5 rounded-lg bg-[#F0F0F0] px-3 py-1">
                <span>{{ t("orders.category") }}</span>
                <span class="font-semibold">
                  {{ props.item.category }}
                </span>
              </div>
              <div class="flex items-center gap-1.5 rounded-lg bg-[#F0F0F0] px-3 py-1">
                <span>{{ t("orders.material") }}</span>
                <span class="font-semibold">
                  {{ props.item.material }}
                </span>
              </div>
              <div class="flex items-center gap-1.5 rounded-lg bg-[#F0F0F0] px-3 py-1">
                <span>{{ t("orders.gender") }}</span>
                <span class="font-semibold">
                  {{ props.item.gender }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-col gap-2.5 text-sm font-normal text-[#A3A3A3]">
            <div class="flex items-center gap-2.5">
              <span>{{ t("orders.size") }}</span>
              <span>{{ props.item.size }}</span>
              <span>{{ t("orders.color") }}</span>
              <span>{{ props.item.color.colorName }}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <span>{{ t("orders.category") }}</span>
              <span>{{ props.item.category }}</span>
              <span>{{ t("orders.material") }}</span>
              <span>{{ props.item.material }}</span>
              <span>{{ t("orders.gender") }}</span>
              <span>{{ props.item.gender }}</span>
            </div>
          </div>
          <OrderItemActions :order="props.order" :item="props.item" />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <Transition name="modal">
        <CreateReview v-if="reviewFormModal" />
      </Transition>
    </Teleport>
  </li>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useOrder } from "@/entities/order-item/lib/use-order";
import { ordersVariants } from "@/entities/order-item/model/orders.variants";
import { reviewFormModal } from "@/entities/order-action/lib/review-form-modal";
import { CreateReview } from "@/features/add-review";
import { OrderItemActions } from "@/entities/order-action";
import { OrderStatus } from "@/entities/order";
import type { OrderProps, OrderPosition } from "@/entities/order";

const props = defineProps<{
  order: OrderProps;
  item: OrderPosition;
}>();

const { t } = useI18n();
const { orderPreview } = useOrder();
const { orderStatus } = ordersVariants();
</script>
