<template>
    <ul class="no-scrollbar flex h-92.5 flex-col overflow-y-auto pb-4">
        <PaymentItem
            v-for="payment in paymentCards(userPaymentCards)"
            :key="payment.id"
            :payment="payment"
            @click="useSavedCard(payment)"
        />
    </ul>
</template>

<script setup lang="ts">
import { paymentCards } from "@/shared/lib/use-payment-card";
import { useSavedPaymentsData } from "@/widgets/user-payment-card-list/lib/use-saved-payment-data";
import { useSavedCard } from "@/features/checkout-payment-dashboard/lib/use-saved-payment-card";
import { PaymentItem } from "@/entities/checkout-payment-item";

const { userPaymentCards } = useSavedPaymentsData();
</script>
