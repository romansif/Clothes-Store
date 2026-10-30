<template>
    <div v-if="!showSuccessFullPayment" class="min-h-screen bg-[#F0F0F0]">
        <div
             class="font-raleway px-4 pt-4 sm:px-4 sm:pt-4 md:px-5 md:pt-5 lg:px-6 lg:pt-6 xl:px-6 xl:pt-6"
        >
            <CheckoutHeader />
            <main :class="checkoutClass">
                <router-view />
                <CheckoutOrder />
            </main>
        </div>
    </div>
    <Transition name="modal">
        <Notification v-if="notify" />
    </Transition>
    <Transition name="modal">
      <PaymentSuccess v-if="showSuccessFullPayment" />
    </Transition>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/use-notify";
import { checkoutClass } from "@/shared/model/saved-checkout-info.variants";
import { CheckoutOrder } from "@/features/checkout-order-info";
import { CheckoutHeader } from "@/widgets/checkout-header";
import { Notification } from "@/shared";
import { showSuccessFullPayment } from "@/features/payment-success/model/success-payment.refs";
import { PaymentSuccess } from "@/features/payment-success";

const { notify } = useBaseModals();
</script>
