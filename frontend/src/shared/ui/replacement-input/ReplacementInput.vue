<template>
  <div :class="[isChecked ? replacementInputClasses.default : replacementInputClasses.checked]">
    <input v-model="model"
           type="radio"
           :value="props.value"
           class="accent-black w-5 h-5"
           v-bind="$attrs" />
    <span>{{ props.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { replacementInputClasses } from "@/shared/ui/replacement-input/replacement-input.variants.ts";
import type { ReplacementInputProps } from "@/shared/ui/replacement-input/replacement-input.types.ts";
import { useReplacementInput } from "@/shared/ui/replacement-input/use-replacement-input.ts";

const props = defineProps<ReplacementInputProps>()

const model = defineModel<string | number>();

const { isChecked } = useReplacementInput(props.value, props);
</script>