<template>
  <input v-model="model" :class="[
      checkoutClasses[props.variant], props.error ? 'placeholder:text-red-500 border-red-400' : 'placeholder:text-gray-600'
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
  checkoutInfo: `bg-[#D9D9D9]/40 border border-gray-300 transition duration-400 hover:bg-gray-50 focus:bg-gray-50
                rounded-xl outline-none px-4 py-3 text-xs placeholder:text-gray-600 w-full class="font-dm-sans"`,
}
</script>

<style scoped>

</style>