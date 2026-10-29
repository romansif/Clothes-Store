<template>
  <div class="font-montserrat fixed inset-0 z-50 bg-[#F0F0F0] flex items-center justify-center">
    <div class="flex flex-col items-center gap-8">
      <h1 class="font-semibold text-6xl md:text-7xl tracking-widest text-[#414141]">THE NOIR</h1>
      <img :src="spinner" alt="" class="w-12 h-12" />
      <p class="text-[#4b5563] font-medium">Loading, please wait…</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import spinner from '@/assets/icons/products/spinner.svg'
</script>


