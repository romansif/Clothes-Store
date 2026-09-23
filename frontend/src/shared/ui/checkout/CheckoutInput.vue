<template>
  <input v-model="model"
         :class="[checkoutClasses[variant],
         errorMessage ? 'placeholder:text-red-500 border-red-500' : '']"
         v-bind="$attrs" />
</template>

<script setup lang="ts">
interface Props {
  variant?: keyof typeof checkoutClasses;
  errorMessage?: string;
}

withDefaults(defineProps<Props>(), {
  variant: 'contactInfo',
  errorMessage: ''
});

const model = defineModel<string | number>();

const checkoutClasses = {
  contactInfo: `bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white focus:bg-white
                rounded-xl outline-none px-4 py-3 text-xs w-full font-dm-sans`,
  payment: `border border-gray-300 rounded-xl outline-none px-4 py-4 text-xs transition duration-400
        bg-gray-50 hover:bg-white appearance-none font-dm-sans placeholder:text-gray-600`,
}
</script>

<style scoped>

</style>