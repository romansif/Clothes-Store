<template>
    <div class="flex justify-between items-center px-12 py-8 bg-white rounded-xl">
      <div class="flex flex-col items-center gap-4">
        <img :src="not_avatar" alt="" class="w-20 rounded-full" />
      </div>
      <div class="flex font-medium gap-10">
        <router-link :to="{ name: 'signIn' }" class="transition duration-400 hover:scale-108">
          <span class="border border-gray-300 rounded-xl px-12 py-3">
            Login
          </span>
        </router-link>
        <router-link :to="{ name: 'signUp' }" class="transition duration-400 hover:scale-108">
          <span class="border border-gray-300 rounded-xl px-5 py-3">
            Registration
          </span>
        </router-link>
      </div>
    </div>
</template>

<script setup lang="ts">
  import not_avatar from '@/assets/icons/users/default-avatar.png'
</script>

<style scoped>

</style>