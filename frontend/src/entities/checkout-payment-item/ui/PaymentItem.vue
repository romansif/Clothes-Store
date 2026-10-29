<template>
    <TransitionGroup name="list">
        <li :class="[getSavedClass, isChosenPayment ? getSavedErrorClass : '']">
            <div class="flex flex-col gap-5">
                <div class="flex gap-5">
                    <span class="text-sm font-semibold">
                        Expiry Date:
                        <span class="font-dm-sans font-normal">{{ payment.expiryDate }},</span>
                    </span>
                    <span class="text-sm font-semibold">
                        CVV: <span class="font-dm-sans font-normal">{{ payment.cardCvv }}</span>
                    </span>
                </div>
                <div class="flex gap-5">
                    <span v-if="payment.cardName" class="text-sm font-semibold">
                        Card Name:
                        <span class="font-dm-sans font-normal">{{ payment.cardName }}</span>
                    </span>
                    <span class="text-sm font-semibold">
                        Card Number: <span class="font-normal">{{ payment.cardNumber }}</span>
                    </span>
                </div>
            </div>
        </li>
    </TransitionGroup>
</template>

<script setup lang="ts">
import { getSavedClass, getSavedErrorClass } from "@/shared/model/saved-checkout-info.variants";
import { isChosenPayment } from "@/entities/checkout-payment-item/model/payment.refs";
import type { UserPayment } from "@/entities/checkout-payment-item";

defineProps<{
    payment: UserPayment;
}>();
</script>
