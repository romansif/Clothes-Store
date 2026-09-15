<template>
  <input v-model="model" type="text" :class="[
      checkoutClasses[props.variant], props.error ? 'placeholder:text-red-500 border-red-500' : ''
      ]" v-bind="$attrs" />
</template>

<script setup lang="ts">
interface Props {
  name?: string,
  variant?: keyof typeof checkoutClasses;
  error: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'base',
  variant: 'contactInfo',
  error: false
})

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