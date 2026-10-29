<template>
    <TransitionGroup name="list">
        <li class="flex flex-col">
            <div class="flex border-b border-gray-300 bg-gray-50 p-3">
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col gap-2">
                        <span :class="orderStatus(order)">
                            {{ order.status }}
                        </span>
                        <div class="flex items-center gap-2">
                            <div class="group relative">
                                <img
                                    @click="copyText(order.id.slice(0, 8))"
                                    :src="copy_btn"
                                    alt=""
                                    class="w-5"
                                />
                                <span
                                    class="absolute w-38 rounded-xl bg-[rgba(0,0,0,0.8)] px-2 py-1 text-xs text-white opacity-0 transition duration-600 group-hover:opacity-100"
                                >
                                    Copy tracking number
                                </span>
                            </div>
                            <span class="font-dm-sans font-medium"
                                >№ {{ order.id.slice(0, 8) }}</span
                            >
                        </div>
                    </div>
                    <OrderStatus :order="order" />
                </div>
                <div class="ml-auto flex flex-col gap-2">
                    <span class="ml-auto text-[#A3A3A3]">Order total</span>
                    <span class="font-dm-sans ml-auto font-bold">$ {{ order.orderTotal }}</span>
                    <span class="ml-auto font-normal text-[#A3A3A3]">{{ order.delivery }}</span>
                </div>
            </div>
            <ProductOrderItem
                v-for="item in order.orderItems"
                :key="order.id"
                :order="order"
                :product="item"
            />
        </li>
    </TransitionGroup>
</template>

<script setup lang="ts">
import { useOrder } from "@/entities/order-item/lib/use-order";
import { ordersVariants } from "@/entities/order-item/model/orders.variants";
import { OrderStatus } from "@/entities/order";
import { ProductOrderItem } from "@/entities/order-item";
import type { Order } from "@/entities/order";

defineProps<{
    order: Order;
}>();

import copy_btn from "@/assets/icons/squares/copy.svg";

const { copyText } = useOrder();
const { orderStatus } = ordersVariants();
</script>
