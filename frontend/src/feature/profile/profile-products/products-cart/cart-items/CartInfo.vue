<script setup lang="ts">
import square from '../../../../../app/assets/icons/square.png'
</script>

<template>
<div class="flex flex-col mt-5 gap-4 font-medium">
  <div class="flex flex-col gap-2 sm:pb-3">
    <span class="text-lg xl:text-xl">ORDER SUMMARY</span>
    <div class="flex flex-col mt-2 gap-1 sm:gap-2 xl:mt-6">
      <div class="flex justify-between text-sm xl:text-lg">
        <span>Subtotal</span>
        <span>$ 180</span>
      </div>
      <div class="flex justify-between text-sm xl:text-lg">
        <span>Shipping</span>
        <span>$ 180</span>
      </div>
    </div>
  </div>
  <div class="border-b-1"></div>
  <div class="flex items-center justify-between text-lg lg:gap-12 xl:text-xl xl:mt-3">
    <div class="flex items-center gap-2">
      <h1 class="font-medium">TOTAL</h1>
      <span class="text-gray-400 text-sm xl:text-lg">(TAX INCL.)</span>
    </div>
    <span>$ 190</span>
  </div>
  <div class="flex flex-col mt-10 hidden xl:block">
    <div class="flex gap-5 items-center">
      <img :src="square" alt="">
      <span class="text-sm text-gray-400">I agree to the Terms and Conditions</span>
    </div>
    <router-link :to="{name: 'checkout/information'}">
      <button class="w-[350px] bg-[#d9d9d9] py-4 mt-8">CONTINUE</button>
    </router-link>
  </div>
</div>
</template>

<style scoped>

</style>