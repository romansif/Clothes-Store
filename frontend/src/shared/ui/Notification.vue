<template>
    <div class="font-montserrat fixed inset-0 z-50 flex items-center justify-center">
        <div
            class="flex h-32.5 w-137.5 items-center justify-center rounded-lg bg-black px-10 text-white opacity-70"
        >
            <div class="flex flex-col items-center gap-3">
                <h1 class="text-center text-lg font-medium">{{ notifyTitle }}</h1>
                <span class="text-center font-normal">{{ notifyMessage }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/use-notify";

const { notifyTitle, notifyMessage } = useBaseModals();
</script>
