<script setup lang="ts">
import not_avatar from '../../../app/assets/icons/not-avatar.png'
</script>

<template>
    <div class="hidden justify-between items-center px-12 py-8 bg-white rounded-xl">
      <div class="flex flex-col items-center gap-4">
        <span class="font-bold text-xl">UserName</span>
        <img :src="not_avatar" alt="" class="w-20 rounded-full" />
      </div>
      <div class="flex font-medium gap-10">
        <router-link :to="{ name: 'login' }">
          <span class="border border-gray-300 rounded-xl px-12 py-3">Login</span>
        </router-link>
        <router-link :to="{ name: 'register' }">
          <span class="border border-gray-300 rounded-xl px-5 py-3">Registration </span>
        </router-link>
      </div>
    </div>
</template>

<style scoped>

</style>