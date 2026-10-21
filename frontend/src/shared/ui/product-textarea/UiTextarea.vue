<template>
  <div class="flex flex-col gap-3">
   <textarea v-model="model" :placeholder="props.placeholder"
             :class="[textareaClass.default, props.errorMessage ? textareaClass.error : '']"
             v-bind="$attrs"
             :maxlength="400" />
    <div class="flex">
      <span v-if="props.errorMessage"
            class="text-red-600 text-xs">
        {{ errorMessage }}
      </span>
      <span class="ml-auto text-[#A3A3A3] text-xs font-medium">{{ createProductForm.description.length }} / 400</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { textareaClass } from "@/shared/ui/product-textarea/product-textarea.variants.ts";
import type { ProductTextareaProps } from "@/shared/ui/product-textarea/product-textarea.types.ts";
import {createProductForm} from "@/entities/product-form/model/product-forms.ts";

const props = defineProps<ProductTextareaProps>()

const model = defineModel<string | number>();
</script>
