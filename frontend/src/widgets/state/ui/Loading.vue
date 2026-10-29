<template>
    <div class="font-montserrat fixed inset-0 z-50 flex items-center justify-center bg-[#F0F0F0]">
        <div class="flex flex-col items-center gap-8">
            <h1 class="text-6xl font-semibold tracking-widest text-[#414141] md:text-7xl">
                THE NOIR
            </h1>
            <img :src="spinner" alt="" class="h-12 w-12" />
            <p class="font-medium text-[#4b5563]">Loading, please wait…</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import spinner from "@/assets/icons/products/spinner.svg";
</script>
