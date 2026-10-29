<template>
    <div class="flex w-100 flex-col gap-4 font-medium">
        <div class="flex flex-col gap-2 sm:pb-3">
            <span class="text-lg xl:text-xl"> ORDER SUMMARY </span>
            <div class="mt-2 flex flex-col gap-1 sm:gap-2 xl:mt-4">
                <div class="flex justify-between text-sm xl:text-lg">
                    <span>Subtotal</span>
                    <span class="font-dm-sans">$ {{ price }}</span>
                </div>
                <div class="flex justify-between text-sm xl:text-lg">
                    <span>Shipping</span>
                    <span class="font-dm-sans">$ {{ price }}</span>
                </div>
            </div>
        </div>
        <div class="border-b"></div>
        <div class="flex items-center justify-between text-lg lg:gap-12 xl:text-xl">
            <div class="flex flex-col">
                <span class="font-dm-sans text-xs text-[#A3A3A3]">
                    $ {{ commissionPrice }} commission and service operation
                </span>
                <div class="mt-3 flex items-center gap-2">
                    <h1 class="font-medium">TOTAL</h1>
                    <span class="text-sm text-[#A3A3A3] xl:text-lg">(TAX INCL.)</span>
                </div>
            </div>
            <span class="font-dm-sans">$ {{ totalPrice }}</span>
        </div>
        <ContinueToOrder />
    </div>
    <Transition name="modal">
        <DeleteModal v-if="deleteModal" />
    </Transition>
</template>

<script setup lang="ts">
import { useCartOrderInfo } from "@/features/cart-item-action/model/cart-order-info";
import { baseDeleteModal } from "@/features/general-delete/lib/base-delete-modal";
import { ContinueToOrder } from "@/features/cart-order-info";
import { DeleteModal } from "@/features/general-delete";

const { deleteModal } = baseDeleteModal();
const { price, commissionPrice, totalPrice } = useCartOrderInfo();
</script>
