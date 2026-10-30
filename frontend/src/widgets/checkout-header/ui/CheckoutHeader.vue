<template>
    <img :src="right_long_arrow" alt="" class="rotate-180" @click="goBack" />
    <header class="mt-16 flex flex-col">
        <h1 class="text-xl font-extrabold md:text-2xl xl:text-4xl">CHECKOUT</h1>
        <div class="mt-8 flex gap-14 text-xs font-medium md:text-sm xl:text-lg">
            <router-link :to="{ name: 'information' }">
                <span :class="isInfo ? 'text-black' : 'text-gray-400'">#INFORMATION</span>
            </router-link>
            <router-link :to="{ name: 'shipping' }">
                <span :class="isShipping ? 'text-black' : 'text-gray-400'">SHIPPING</span>
            </router-link>
            <router-link :to="{ name: 'payment' }">
                <span :class="isPayment ? 'text-black' : 'text-gray-400'">PAYMENT</span>
            </router-link>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useCheckoutHeader } from "@/widgets/checkout-header/lib/use-checkout-header";

import right_long_arrow from "@/assets/icons/arrows/right-long-arrow.png";

const route = useRoute();
const router = useRouter();

const { goBack, isInfo, isShipping, isPayment } = useCheckoutHeader(route, router);
</script>

<style scoped></style>
