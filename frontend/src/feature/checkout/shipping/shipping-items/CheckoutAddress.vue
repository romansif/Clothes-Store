<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col mt-8 gap-5">
    <div class="flex flex-col px-3 py-6 border">
      <div class="flex justify-between">
        <span class="font-semibold">SHIP TO</span>
        <router-link :to="{name: 'checkout/information'}" class="text-xs text-gray-500">
          Change
        </router-link>
      </div>
      <span class="text-xs text-gray-500">Tashkent, Uzbekistan, Amir Temur C-1, house 4</span>
    </div>
  </div>
</template>

<style scoped>

</style>