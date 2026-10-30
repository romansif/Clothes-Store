<template>
    <TransitionGroup name="list">
        <li
            :key="payment.id"
            class="mt-5 flex h-fit flex-col rounded-xl border border-gray-200 p-2 shadow-lg"
        >
            <div class="flex flex-col gap-5">
                <div class="flex gap-5">
                    <span class="text-sm font-semibold">
                        Expiry Date:
                        <span class="font-dm-sans font-normal">{{ payment.expiryDate }},</span>
                    </span>
                    <span class="text-sm font-semibold">
                        CVV: <span class="font-dm-sans font-normal">{{ payment.cardCvv }}</span>
                    </span>
                    <img
                        @click="
                            emit(
                                'deletePayment',
                                'Are you sure you want to delete this saved card?',
                                'DELETE_SAVED_CARD',
                                payment.id,
                            )
                        "
                        :src="del"
                        alt=""
                        class="cursor-pointer ml-auto w-5 transition duration-400 hover:scale-120"
                    />
                </div>
                <div class="flex gap-5">
                    <span v-if="payment.cardName" class="text-sm font-semibold">
                        Card Name: <span class="font-normal">{{ payment.cardName }}</span>
                    </span>
                    <span class="text-sm font-semibold">
                        Card Number:
                        <span class="font-dm-sans font-normal">{{ payment.cardNumber }}</span>
                    </span>
                </div>
            </div>
        </li>
    </TransitionGroup>
</template>

<script setup lang="ts">
import type { UserPayment } from "@/entities/checkout-payment-item";

import del from "@/assets/icons/delete-close/delete.svg";

defineProps<{
    payment: UserPayment;
}>();

const emit = defineEmits<{
    deletePayment: [title: string, type: string, id: string];
}>();
</script>
