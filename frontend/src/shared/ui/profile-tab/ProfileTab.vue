<template>
    <div class="cursor-pointer border-b border-gray-300 px-6 py-6" v-bind="$attrs">
        <div class="flex items-center justify-between transition duration-400 hover:scale-105">
            <span>{{ props.name }}</span>
            <img :src="arrow_down" alt="" class="w-5" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TabProps } from "@/shared/ui/profile-tab";

import arrow_down from "@/assets/icons/arrows/arrow-down.svg";

const props = defineProps<TabProps>();
</script>
