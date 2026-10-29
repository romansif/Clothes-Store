<template>
    <div class="mt-8 flex flex-col gap-5 font-[Montserrat]">
        <div class="flex flex-col">
            <div class="flex justify-between">
                <h1 class="text-sm font-medium">PAYMENT CARDS</h1>
                <span
                    @click="toggleShowPayment"
                    class="cursor-pointer text-xs text-indigo-500 hover:text-violet-600"
                >
                    Hide saved payment
                </span>
            </div>
            <CheckoutPaymentList />
        </div>
    </div>
</template>

<script setup lang="ts">
import { togglePaymentForm } from "@/features/checkout-payment-dashboard/lib/toggle-payment";
import { CheckoutPaymentList } from "@/widgets/checkout-cards-list";

const { toggleShowPayment } = togglePaymentForm();
</script>
