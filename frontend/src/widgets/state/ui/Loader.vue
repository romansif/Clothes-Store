<template>
    <div :class="loaderBoxVariantClass[props.variant]">
        <div class="flex flex-col items-center gap-8">
            <img :src="spinner" alt="" class="h-12 w-12" />
            <p class="font-medium text-[#4b5563]">Loading, please wait…</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { loaderBoxVariantClass } from "@/widgets/state/model/state.variants";
import type { PageVariant } from "@/widgets/state";

import spinner from "@/assets/icons/app/spinner.svg";

const props = defineProps<{
    variant: PageVariant;
}>();
</script>
