<template>
  <div class="flex flex-col gap-3">
    <input v-model="model"
           :class="[inputVariantClasses[props.variant], props.errorMessage ? inputErrorClass : '']"
           v-bind="$attrs"
           :maxlength="props.maxLength" />
    <div class="flex">
      <span v-if="props.errorMessage"
            class="text-red-600 text-xs">{{ props.errorMessage }}</span>
      <span v-if="props.maxLength" class="ml-auto shrink-0 text-xs font-medium text-[#A3A3A3]">
        {{ currentLength }} / {{ maxLength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInput } from "@/shared/ui/input/use-input";
import { inputErrorClass, inputVariantClasses } from "@/shared/ui/input/input.variants";
import type { InputProps } from "@/shared/ui/input";

const props = withDefaults(defineProps<InputProps>(), {
  variant: 'auth',
});

const model = defineModel<string | number>();

const { currentLength } = useInput(model);
</script>
