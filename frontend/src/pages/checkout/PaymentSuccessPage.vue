<template>
  <div class="font-raleway flex min-h-screen w-full items-center justify-center bg-[#F0F0F0]">
    <div class="flex flex-col items-center gap-7">
      <PaymentSuccess />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaymentSuccess } from "@/features/payment-success";
</script>
