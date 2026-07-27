<script setup lang="ts">
interface Props {
  name?: string,
  variant?: keyof typeof variantClasses;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'base',
  variant: 'login'
})

const variantClasses = {
  login: `bg-black text-white rounded px-6 py-3.5 mt-10 font-semibold w-full text-start`,
  register:  `bg-black text-white rounded px-6 py-3.5 mt-10 font-semibold w-full text-start`,
  changeRegister: `text-center text-sm text-[#A3A3A3]`,
  addToCart: `bg-black font-semibold text-sm py-5 w-full text-white font-[Montserrat] lg:block cursor-pointer`,
  addToOrder: `w-full font-semibold bg-black text-white py-4 mt-8`,
  checkOut: `bg-black text-white font-semibold w-full text-start px-3 py-2 cursor-pointer text-sm font-medium
          sm:w-[300px] sm:ml-auto md:w-[365px] lg:w-[195px] xl:w-[246px]`,
  profileForm: `bg-black text-white rounded px-6 py-3.5 font-semibold w-[230px] text-start`,
  repeatOrder: `ml-auto px-4 py-2 text-xs font-semibold border bg-black text-white rounded-md`,
  outOfStack: `w-full font-semibold bg-[#A3A3A3] text-white py-4 mt-1`
}

</script>

<template>
  <button :class="variantClasses[props.variant]" v-bind="$attrs">
    <slot>{{ props.name }}</slot>
  </button>
</template>