<template>
    <div :class="[baseReplacementInputClass, isChecked ? replacementInputClasses.checked : replacementInputClasses.default]">
        <input
            v-model="model"
            type="radio"
            :value="props.value"
            class="h-5 w-5 accent-black"
            v-bind="$attrs"
        />
        <span>{{ props.name }}</span>
    </div>
</template>

<script setup lang="ts">
import { useReplacementInput } from "@/shared/ui/replacement-input/use-replacement-input";
import {
  baseReplacementInputClass,
  replacementInputClasses
} from "@/shared/ui/replacement-input/replacement-input.variants";
import type { ReplacementInputProps } from "@/shared/ui/replacement-input";

const props = defineProps<ReplacementInputProps>();

const model = defineModel<string | number>();

const { isChecked } = useReplacementInput(model, props);
</script>
