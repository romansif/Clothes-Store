<template>
 <textarea v-model="model" :placeholder="placeholder"
           :class="['h-25 border border-gray-200 rounded-sm outline-none px-6 py-5 text-sm bg-white',
                errorMessage ? 'border-red-500' : '']" />
  <span v-if="errorMessage" class="text-red-600 text-xs">
    {{ errorMessage }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: keyof typeof variantClasses;
  placeholder?: string;
  errorMessage?: string;
}

withDefaults(defineProps<Props>(), {
  variant: 'desc',
  placeholder: '',
  errorMessage: '',
});

const model = defineModel<string | number>();

const variantClasses = {
  desc: `'h-25 border border-gray-200 rounded-sm outline-none px-6 py-5 text-sm bg-white'`
}
</script>

<style scoped>

</style>