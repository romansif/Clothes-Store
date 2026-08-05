<script setup lang="ts">
  import CartItem from "./CartItem.vue";
</script>

<template>
  <ul class="flex flex-col overflow-y-auto gap-10 mt-4 h-[370px] no-scrollbar w-[325px] sm:h-[370px]
      md:w-full md:grid md:grid-cols-2 md:gap-30 lg:grid-cols-3 lg:gap-15 xl:grid-cols-2 xl:w-[840px] xl:h-[470px]">
    <CartItem />
  </ul>
</template>

<style scoped>

</style>