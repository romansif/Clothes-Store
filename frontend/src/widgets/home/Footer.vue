<template>
  <footer class="font-montserrat flex justify-center items-center bg-[#F5F5F5] mt-30">
    <div class="w-75 md:w-175 lg:w-250 py-20">
      <div class="flex gap-50 items-center md:gap-60 lg:gap-100">
        <div class="grid grid-cols-2 gap-30 md:flex md:flex-col md:gap-15">
          <div class="font-medium flex flex-col gap-6">
            <span class="text-[#A3A3A3]">INFO</span>
            <div class="flex flex-col gap-2 text-gray-600">
              <span class="transition duration-400 hover:scale-115 cursor-pointer">Pricing /</span>
              <span class="transition duration-400 hover:scale-115 cursor-pointer">ABOUT /</span>
              <span class="transition duration-400 hover:scale-115 cursor-pointer">CONTACTS</span>
            </div>
          </div>
          <div class="font-medium flex flex-col gap-6">
            <span class="text-[#A3A3A3]">LANGUAGES</span>
            <div class="flex flex-col gap-2 text-gray-600">
              <span class="transition duration-400 hover:scale-115 cursor-pointer">ENG /</span>
              <span class="transition duration-400 hover:scale-115 cursor-pointer">ESP /</span>
              <span class="transition duration-400 hover:scale-115 cursor-pointer">SVE</span>
            </div>
          </div>
        </div>
        <div class="hidden md:flex md:flex-col md:items-start md:font-medium">
          <span class="font-medium text-[#A3A3A3]">TECHNOLOGIES</span>
          <div class="flex flex-col items-start">
            <div class="relative">
              <span class="text-[80px] font-black text-[#D9D9D9]">VR</span>
              <img :src=logo alt="" class="absolute left-2 top-1/3 w-10">
            </div>
            <div class="flex gap-5">
              <span class="text-[80px] font-black">XIV</span>
              <span class="font-medium mt-10 text-[#A3A3A3]">Near-field communication /</span>
            </div>
            <span class="text-[80px] font-black">QR</span>
          </div>
        </div>
     </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logo from '@/assets/icons/nav/logo.png';
</script>

<style scoped>

</style>