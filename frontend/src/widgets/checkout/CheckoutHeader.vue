<template>
  <img @click="goBack" :src="go_to_shop" alt="" class="rotate-180">
  <header class="flex flex-col mt-16">
    <h1 class="font-extrabold text-xl md:text-2xl xl:text-4xl">CHECKOUT</h1>
    <div class="flex gap-14 font-medium mt-8 text-xs md:text-sm xl:text-lg">
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
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUpdateCart } from "@/features/use-cart/api/update-cart.ts";

import go_to_shop from "@/assets/icons/arrows/right-long-arrow.png";

const route = useRoute();
const router = useRouter();

const { updateCartChecked } = useUpdateCart();

const isInfo = computed(() => route.name === 'information')
const isShipping = computed(() => route.name === 'shipping')
const isPayment = computed(() => route.name === 'payment')

const goBack = async () => {
  if(route.name === 'information') {
    await updateCartChecked()
  }

  router.back();
};
</script>

<style scoped>

</style>