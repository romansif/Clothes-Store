<template>
  <input v-model="model" :class="[
      checkoutClasses[props.variant], props.error ? 'placeholder:text-red-500 border-red-500' : ''
      ]" v-bind="$attrs">
</template>

<script setup lang="ts">
interface Props {
  name?: string,
  variant?: keyof typeof checkoutClasses;
  error: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'base',
  variant: 'checkoutInfo',
  error: false
})

const model = defineModel<string | number>();

const checkoutClasses = {
  checkoutInfo: `bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white focus:bg-white
                rounded-xl outline-none px-4 py-3 text-xs placeholder:text-gray-600 w-full font-dm-sans`,
}
</script>

<style scoped>

</style>