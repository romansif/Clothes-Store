<template>
    <div class="px-4 sm:px-4 md:px-5 lg:w-75 xl:w-100">
        <div class="flex">
            <h1 class="mt-2.5 font-medium">YOUR ORDER</h1>
            <span class="ml-auto bg-white px-2 py-1">
                (
                <span class="font-dm-sans font-medium text-blue-700">
                    {{ items?.length || 0 }}
                </span>
                )
            </span>
        </div>
        <CheckoutOrderList />
        <div class="mt-5 border-b border-gray-300"></div>
        <div class="mt-3 flex flex-col gap-2 text-xs font-medium">
            <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="font-dm-sans">$ {{ price }}</span>
            </div>
            <div class="flex items-center">
                <span>Shipping</span>
                <div class="ml-auto flex gap-2">
                    <span v-if="shipping" class="text-gray-400">
                        {{ shipping.delivery }}
                    </span>
                    <span v-else class="text-gray-400"> Calculated at next step </span>
                </div>
            </div>
        </div>
        <div class="mt-3 mb-1 border-b border-gray-300"></div>
        <span class="font-dm-sans text-xs text-[#A3A3A3]">
            $ {{ commissionPrice }} commission and service operation
        </span>
        <div class="mt-3 flex justify-between text-sm font-medium">
            <span>Total</span>
            <span class="font-dm-sans"> $ {{ totalPrice }} </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { orderStore } from "@/shared/model/order.store";
import { useSavedShippingData } from "@/features/checkout-shipping-info/lib/use-saved-shipping-data";
import { orderPriceInfo } from "@/features/checkout-order-info/lib/order-price-info";
import { CheckoutOrderList } from "@/widgets/checkout-order-list";

const { items } = orderStore();
const { shipping } = useSavedShippingData();
const { price, totalPrice, commissionPrice } = orderPriceInfo();
</script>
