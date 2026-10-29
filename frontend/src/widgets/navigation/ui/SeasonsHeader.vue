<template>
    <header class="font-raleway flex justify-between">
        <template v-for="season in seasonsCatalog" :key="season.id">
            <div v-if="route.name === season.route" class="flex flex-col">
                <div class="flex flex-col">
                    <div class="flex flex-col items-center gap-2 xl:items-start">
                        <div class="flex gap-2 font-semibold">
                            <router-link
                                :to="{ name: 'shop/seasons-catalog' }"
                                class="text-[#A3A3A3]"
                            >
                                Seasonal
                            </router-link>
                            <span>/</span>
                            <span>
                                {{ season.name }}
                            </span>
                        </div>
                        <h1 class="text-4xl font-extrabold">
                            {{ season.slogan }}
                        </h1>
                    </div>
                    <span class="mt-15 text-xl text-[#A3A3A3]">
                        {{ season.text }}
                    </span>
                </div>
            </div>
        </template>
        <div class="mt-12 flex h-10 flex-col gap-5 sm:h-35 xl:mt-0 xl:h-53.75">
            <MainSlideBar />
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { MainSlideBar } from "@/widgets/navigation";
import { seasonsCatalog } from "@/entities/season-product/model/seasons-specific";

const route = useRoute();
</script>
