<script setup lang="ts">
  import logo from '../../app/assets/icons/logo.png'
</script>

<template>
  <footer class="flex justify-center items-center bg-[#F5F5F5] mt-30">
    <div class="w-[300px] md:w-[700px] lg:w-[1000px] py-20">
      <div class="flex gap-50 items-center md:gap-60 lg:gap-100">
        <div class="grid grid-cols-2 gap-30 md:flex md:flex-col md:gap-15">
          <div class="flex flex-col gap-10 font-medium">
            <span class="text-[#D9D9D9]">INFO</span>
            <div class="flex flex-col gap-2 text-gray-600">
              <span>Pricing /</span>
              <span>ABOUT /</span>
              <span>CONTACTS</span>
            </div>
          </div>
          <div class="flex flex-col gap-10 font-medium">
            <span class="text-[#D9D9D9]">LANGUAGES</span>
            <div class="flex flex-col gap-2 text-gray-600">
              <span>ENG /</span>
              <span>ESP /</span>
              <span>SVE</span>
            </div>
          </div>
        </div>
        <div class="hidden md:flex md:flex-col md:items-start md:font-medium">
          <span class="text-[#D9D9D9]">TECHNOLOGIES</span>
          <div class="flex flex-col items-start">
            <div class="relative">
              <span class="text-[80px] font-black text-[#D9D9D9]">VR</span>
              <img :src=logo alt="" class="absolute left-1 top-1/3 w-[40px]">
            </div>
            <div class="flex gap-5">
              <span class="text-[80px] font-black">XIV</span>
              <span class="mt-9 text-[#D9D9D9]">Near-field communication /</span>
            </div>
            <span class="text-[80px] font-black">QR</span>
          </div>
        </div>
     </div>
    </div>
  </footer>
</template>

<style scoped>

</style>