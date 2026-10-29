<template>
    <div :class="[isChecked ? replacementInputClasses.default : replacementInputClasses.checked]">
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
import { replacementInputClasses } from "@/shared/ui/replacement-input/replacement-input.variants";
import type { ReplacementInputProps } from "@/shared/ui/replacement-input";

const props = defineProps<ReplacementInputProps>();

const model = defineModel<string | number>();

const { isChecked } = useReplacementInput(props.value, props);
</script>
