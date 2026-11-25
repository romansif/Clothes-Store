<template>
  <div class="flex flex-col gap-3">
    <textarea
      v-model="model"
      :placeholder="props.placeholder"
      :class="[TEXTAREA_CLASS.default, props.errorMessage ? TEXTAREA_CLASS.error : '']"
      v-bind="$attrs"
      :maxlength="400"
    />
    <div class="flex">
      <span v-if="props.errorMessage" class="text-xs text-red-600">
        {{ props.errorMessage }}
      </span>
      <span class="ml-auto text-xs font-medium text-[#A3A3A3]">{{ length }} / 400</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { TEXTAREA_CLASS } from "@/shared/ui/product-textarea/product-textarea.variants";
import type { ProductTextareaProps } from "@/shared/ui/product-textarea";

const props = defineProps<ProductTextareaProps>();

const model = defineModel<string>({
  default: "",
});

const length = computed(() => model.value.length);
</script>
