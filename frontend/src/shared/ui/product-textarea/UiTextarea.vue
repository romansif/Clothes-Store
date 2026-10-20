<template>
 <textarea v-model="model" :placeholder="props.placeholder"
           :class="props.errorMessage ? textareaClass.error : textareaClass.default" />
  <span v-if="props.errorMessage"
        class="text-red-600 text-xs">
    {{ errorMessage }}
  </span>
</template>

<script setup lang="ts">
import { textareaClass } from "@/shared/ui/product-textarea/product-textarea.variants.ts";
import type { ProductTextareaProps } from "@/shared/ui/product-textarea/product-textarea.types.ts";

const props = defineProps<ProductTextareaProps>()

const model = defineModel<string | number>();
</script>
