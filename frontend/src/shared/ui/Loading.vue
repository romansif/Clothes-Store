<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[#F0F0F0] flex flex-col items-center justify-center transition-opacity duration-500">
    <div class="flex flex-col items-center gap-12">
      <h1 class="font-semibold text-6xl md:text-7xl tracking-widest text-neutral-900">
        NOIR
      </h1>
      <div class="">
        <img :src="loading" alt="Loading" class="w-full object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import loading from '@/assets/icons/auth/loading.svg'
</script>

<style scoped>

</style>