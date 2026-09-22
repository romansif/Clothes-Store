<template>
  <div class="flex justify-center pt-45">
    <div class="flex flex-col items-center gap-5">
      <img :src="icon_card" alt="" >
      <div class="flex flex-col gap-2 items-center">
        <span class="font-bold">You have no saved cards</span>
        <span class="text-[#A3A3A3]">It’s the perfect time to place your first order.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import icon_card from "@/assets/icons/checkout/payment/icon_card.svg";
</script>

<style scoped>

</style>