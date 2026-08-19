<script setup lang="ts">
  import CartItem from "./CartItem.vue";
</script>

<template>
  <ul class="flex flex-col overflow-y-auto gap-10 mt-4 h-92.5 no-scrollbar w-81.25 sm:h-92.5
      md:w-full md:grid md:grid-cols-2 md:gap-30 lg:grid-cols-3 lg:gap-15 xl:grid-cols-2 xl:w-210 xl:h-117.5">
    <CartItem />
  </ul>
</template>

<style scoped>

</style>