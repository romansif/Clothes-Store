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
  login: `bg-black text-white rounded px-6 py-3.5 mt-6 font-semibold w-full text-start transition duration-400 hover:scale-105`,
  register:  `bg-black text-white rounded px-6 py-3.5 mt-6 font-semibold w-full text-start transition duration-400 hover:scale-105`,
  changeRegister: `text-center text-sm text-[#A3A3A3]`,
  addToCart: `bg-black font-semibold text-sm py-5 w-full text-white font-[Montserrat] lg:block cursor-pointer
          transition duration-300 transform hover:scale-108`,
  addToOrder: `w-full font-semibold bg-black text-white py-4 mt-8  transition duration-400 hover:scale-108`,
  checkOut: `bg-black text-white font-semibold w-full text-start px-3 py-2 cursor-pointer text-sm font-medium
          sm:w-[300px] sm:ml-auto md:w-[365px] lg:w-[195px] xl:w-[246px]  transition duration-400 hover:scale-108`,
  profileForm: `bg-black text-white rounded px-6 py-3.5 font-semibold w-[230px] text-start transition duration-400 hover:scale-105`,
  toggleAvatar: `bg-black text-white rounded px-8 py-3.5 font-semibold text-start transition duration-400 hover:scale-120`,
  repeatOrder: `ml-auto px-4 py-2 text-xs font-semibold border bg-black text-white rounded-md transition duration-400 hover:scale-108`,
  outOfStack: `w-full font-semibold bg-[#A3A3A3] text-white py-4 mt-1 transition duration-300 transform hover:scale-108`,
  exitClose: `class="text-start ml-auto h-fit w-fit px-10 py-2 bg-red-600 text-white font-medium text-xs rounded-md
          transition duration-300 transform hover:scale-108 hover:bg-red-500`,
  cancel: `bg-red-600 text-white px-8 py-3.5 font-medium text-xs rounded-md transition duration-300 hover:scale-108 hover:bg-red-700`,
  confirm: `bg-blue-700 text-white px-8 py-3.5 font-medium text-xs rounded-md transition duration-300 hover:scale-108 hover:bg-blue-800`
}

</script>

<template>
  <button :class="variantClasses[props.variant]" v-bind="$attrs">
    <slot>{{ props.name }}</slot>
  </button>
</template>