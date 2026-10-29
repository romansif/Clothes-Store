<template>
  <div :class="loaderBoxVariantClass[props.variant]">
    <div class="flex flex-col items-center gap-8">
      <img :src="spinner" alt="" class="w-12 h-12" />
      <p class="text-[#4b5563] font-medium">Loading, please wait…</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loaderBoxVariantClass } from "@/widgets/state/model/state.variants";
import type { PageVariant } from "@/widgets/state";

import spinner from '@/assets/icons/products/spinner.svg'

const props = defineProps<{
  variant: PageVariant
}>()
</script>