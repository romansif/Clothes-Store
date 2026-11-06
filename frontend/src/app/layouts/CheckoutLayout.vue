<template>
  <div class="min-h-screen bg-[#F0F0F0]">
    <div class="font-raleway p-4 md:p-5 lg:p-6">
      <CheckoutHeader />
      <main :class="checkoutClass">
        <router-view />
        <CheckoutOrder />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { checkoutClass } from "@/shared/model/saved-checkout-info.variants";
import { CheckoutOrder } from "@/features/checkout-order-info";
import { CheckoutHeader } from "@/widgets/checkout-header";
</script>
