<script setup lang="ts">

</script>

<template>
  <router-link :to="{ name: 'home' }">
    <div class="bg-[#D9D9D9] h-screen font-[Montserrat]">
      <div class="relative">
        <h1 class="absolute z-50 top-6 left-80 text-[#3A3535] font-black text-[400px]">404</h1>
        <h2 class="absolute top-[-95px] left-80 text-[#B5A4A4] font-black text-[400px] opacity-50">404</h2>
        <h2 class="absolute top-37 left-80 text-[#8F5858] font-black text-[400px] opacity-50">404</h2>
        <span class="absolute top-170 left-105 text-white text-[80px] font-black">Page not found</span>
      </div>
    </div>
  </router-link>
</template>

<style scoped>

</style>
