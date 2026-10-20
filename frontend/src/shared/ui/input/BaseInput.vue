<template>
  <input v-model="model"
         :class="[inputVariantClasses[props.variant], props.errorMessage ? inputErrorClass : '']"
         v-bind="$attrs" />
  <span v-if="props.errorMessage"
        class="text-red-600 text-xs">{{ props.errorMessage }}</span>
</template>

<script setup lang="ts">
import { inputErrorClass, inputVariantClasses } from "@/shared/ui/input/input.variants.ts";
import type { InputProps } from "@/shared/ui/input/input.types.ts";

const props = withDefaults(defineProps<InputProps>(), {
  variant: 'auth',
});

const model = defineModel<string | number>();
</script>
