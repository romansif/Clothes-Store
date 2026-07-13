<script setup lang="ts">

import search from "../../../app/assets/icons/search.png";
</script>

<template>
  <div class="flex">
    <div class="relative">
      <input type="text" class="bg-[#D9D9D9] h-[50px] w-[300px] sm:w-[400px] placeholder:px-45 xl:border-none xl:outline-none px-10 sm:placeholder:px-70" placeholder="Search">
      <img :src=search alt="" class="absolute left-4 top-1/2 -translate-y-1/2">
    </div>
  </div>
</template>

<style scoped>

</style>