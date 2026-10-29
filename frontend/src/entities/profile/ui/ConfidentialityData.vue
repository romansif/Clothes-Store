<template>
    <template v-if="user">
        <div class="mt-4 flex w-full flex-col gap-4">
            <div class="flex gap-2">
                <span>Role:</span>
                <span>{{ user.role }}</span>
            </div>
            <div v-if="user.role === 'Seller'" class="flex gap-2">
                <span>Company:</span>
                <span>NOIR</span>
            </div>
            <div v-if="user.role === 'Buyer'" class="flex gap-2">
                <div v-if="user.phone" class="flex gap-2">
                    <span>Phone:</span>
                    <span>{{ user.phone }}</span>
                </div>
                <span v-else class="text-sm font-medium opacity-50"> Phone not provided </span>
            </div>
        </div>
        <div class="mt-4 flex w-full flex-col gap-4">
            <div v-if="user.role === 'Seller'" class="flex gap-2">
                <div v-if="user.phone" class="flex gap-2">
                    <span>Phone:</span>
                    <span>{{ user.phone }}</span>
                </div>
                <span v-else class="text-sm font-medium opacity-50"> Phone not provided </span>
            </div>
            <div v-if="user.email" class="flex gap-2">
                <span>Email:</span>
                <span>{{ user.email }}</span>
            </div>
            <span v-else class="text-sm font-medium opacity-50"> Email not provided </span>
        </div>
    </template>
</template>

<script setup lang="ts">
import type { User } from "@/entities/profile";

defineProps<{
    user: User | undefined;
}>();
</script>
