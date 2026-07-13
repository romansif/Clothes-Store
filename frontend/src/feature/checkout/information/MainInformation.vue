<script setup lang="ts">
  import ContactInfo from "./information-items/ContactInfo.vue";
  import go_to_shop from "../../app/assets/icons/arrows/go-to-shop.png";
  import ShippingAddress from "./information-items/ShippingAddress.vue";
  import arrow from "../../app/assets/icons/arrows/go-to-shop.png";
  import MainOrder from "../order-information/MainOrder.vue";
</script>

<template>
  <div class="font-[Montserrat] xl:px-6 xl:pt-6 lg:px-6 lg:pt-6 md:px-5 md:pt-5 sm:px-4 sm:pt-4 px-4 pt-4">
    <img :src="go_to_shop" alt="" class="rotate-180">
    <div class="mt-15">
      <h1 class="font-extrabold text-xl">CHECKOUT</h1>
      <div class="flex justify-between font-medium mt-8 text-xs">
        <span>#INFORMATION</span>
        <span class="text-gray-400">SHIPPING</span>
        <span class="text-gray-400">PAYMENT</span>
      </div>
      <div class="flex flex-col gap-90">
        <div class="flex flex-col">
          <ContactInfo />
          <ShippingAddress />
          <div class="relative mt-3">
            <button class="bg-[#D9D9D9] w-full text-start px-3 py-2 cursor-pointer text-sm font-medium">Shipping</button>
            <img :src=arrow alt="" class="absolute left-80 top-1/2 -translate-y-1/2">
          </div>
        </div>
        <MainOrder />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>