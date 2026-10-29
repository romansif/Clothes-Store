<template>
    <div class="flex items-center justify-between rounded-xl bg-white px-12 py-8">
        <div class="flex flex-col items-center gap-4">
            <img :src="not_avatar" alt="" class="w-20 rounded-full" />
        </div>
        <div class="flex gap-10 font-medium">
            <router-link :to="{ name: 'signIn' }" class="transition duration-400 hover:scale-108">
                <span class="rounded-xl border border-gray-300 px-12 py-3"> Login </span>
            </router-link>
            <router-link :to="{ name: 'signUp' }" class="transition duration-400 hover:scale-108">
                <span class="rounded-xl border border-gray-300 px-5 py-3"> Registration </span>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import not_avatar from "@/assets/icons/users/default-avatar.png";
</script>
