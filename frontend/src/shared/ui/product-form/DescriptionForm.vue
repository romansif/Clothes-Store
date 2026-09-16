<template>
 <textarea v-model="createProductForm.description"
           placeholder="short desc. product"
           :class="['h-25 border border-gray-200 rounded-sm outline-none px-6 py-5 text-sm bg-white',
                createProductFormErrorMessages.description ? 'border-red-500' : '']" />
  <span v-if="createProductFormErrorMessages.description" class="text-red-600 text-xs">
    {{ createProductFormErrorMessages.description }}
  </span>
</template>

<script setup lang="ts">

import { createProductForm, createProductFormErrorMessages } from "@/features/use-product-form/model/product.forms.ts";
</script>

<style scoped>

</style>