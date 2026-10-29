<template>
    <div class="mt-8 flex flex-col">
        <div
            class="font-dm-sans flex flex-col gap-1 rounded-xl border border-gray-400 bg-gray-50 px-3 py-6 transition duration-400 hover:bg-white"
        >
            <div class="flex justify-between">
                <span class="font-semibold"> SHIP TO </span>
                <router-link :to="{ name: 'information' }" class="text-xs text-gray-500">
                    Change
                </router-link>
            </div>
            <span class="text-xs text-gray-500">
                {{ userAddress?.country }}, {{ userAddress?.address }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { UserContactInfo } from "@/entities/user-address";

defineProps<{
    userAddress: UserContactInfo | undefined;
}>();
</script>
