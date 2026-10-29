<template>
    <main class="mt-10 flex flex-col gap-6">
        <HeaderCatalog />
        <div class="flex gap-10">
            <SeasonsCatalog />
        </div>
    </main>
</template>

<script setup lang="ts">
import { HeaderCatalog } from "@/widgets/navigation";
import { SeasonsCatalog } from "@/features/season-catalog";
</script>
