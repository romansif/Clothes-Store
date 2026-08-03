<script setup lang="ts">
interface Props {
  name?: string,
  variant?: keyof typeof variantClasses;
  error: boolean;
  errorMessage: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'base',
  variant: 'auth',
  error: false,
  errorMessage: '',
})

const model = defineModel<string | number>();

const variantClasses = {
  auth: `bg-[#D9D9D9]/40 w-full outline-none px-6 py-4 rounded-sm
      transition duration-400 hover:bg-gray-50 focus:bg-gray-50 border border-gray-30`,
  createProduct: `border border-gray-200 rounded-sm outline-none px-6 py-5 text-sm bg-white transition duration-400 hover:`,
  confidentialityData: `w-full border border-gray-300 rounded-xl outline-none px-4 py-4 text-sm bg-[#D9D9D9]/40
                   transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none`,
}
</script>

<template>
  <input v-model="model" :class="[
      variantClasses[props.variant], props.error ? 'border border-red-500' : 'border-gray-300'
      ]" v-bind="$attrs" />
  <span v-if=props.errorMessage class="text-red-600 text-xs">{{ props.errorMessage }}</span>
</template>