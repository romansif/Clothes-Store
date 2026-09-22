<template>
  <input v-model="model" :class="[
      variantClasses[variant], errorMessage ? 'border border-red-500' : 'border border-gray-300'
      ]" v-bind="$attrs" />
  <span v-if="errorMessage" class="text-red-600 text-xs">{{ errorMessage }}</span>
</template>

<script setup lang="ts">
interface Props {
  variant?: keyof typeof variantClasses;
  errorMessage?: string;
}

withDefaults(defineProps<Props>(), {
  variant: 'auth',
  errorMessage: '',
});

const model = defineModel<string | number>();

const variantClasses = {
  auth: `bg-[#D9D9D9]/40 w-full outline-none px-4 py-4 rounded-sm font-dm-sans
      transition duration-400 hover:bg-gray-50 focus:bg-gray-50`,
  createProduct: `rounded-sm outline-none px-6 py-5 text-sm bg-white transition duration-400 font-dm-sans`,
  confidentialityData: `w-full rounded-xl outline-none px-4 py-4 text-sm bg-[#D9D9D9]/40
                   transition duration-400 hover:bg-gray-50 focus:bg-gray-50 appearance-none font-dm-sans`,
}
</script>
