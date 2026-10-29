<template>
    <div
        v-for="season in seasonsCatalog"
        :key="season.id"
        @click="router.push({ name: `${season.route}` })"
        class="font-montserrat h-100 w-92 cursor-pointer rounded-2xl text-white transition duration-500 hover:scale-108"
        :style="{ backgroundImage: `url(${season.url})` }"
    >
        <div
            style="filter: drop-shadow(0 0 8px rgba(255, 255, 255, 1))"
            class="flex flex-col gap-29 px-8 py-12"
        >
            <div class="flex items-center gap-3">
                <span>{{ season.id }}</span>
                <div class="w-15 border-2 border-b"></div>
            </div>
            <div class="flex flex-col gap-5">
                <h1 class="text-3xl font-semibold">{{ season.title }}</h1>
                <p class="text-md w-55 font-medium">{{ season.text }}</p>
                <div class="flex items-center gap-15">
                    <span class="cursor-pointer font-medium"> View Collection </span>
                    <img :src="right_shop" alt="" class="w-16" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from "@/app/router";
import { seasonsCatalog } from "@/entities/season-product/model/seasons-specific";

import right_shop from "@/assets/icons/arrows/go-shop.svg";
</script>
