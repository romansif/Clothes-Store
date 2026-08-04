<script setup lang="ts">
import { computed } from "vue";

const isChecked = computed(() => model.value === props.value);

interface Props {
  name?: string,
  variant?: keyof typeof cancelOrderClasses;
  value?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'base',
  variant: 'choice',
})

const model = defineModel<string | number>();

const cancelOrderClasses = {
  choice: `flex items-center gap-5 w-full p-4 transition duration-300 hover:scale-103`,
}
</script>

<template>
  <div :class="[cancelOrderClasses[props.variant], isChecked ? 'scale-103' : '' ]">
    <input v-model="model" type="radio" :value="props.value" class="accent-black w-5 h-5" v-bind="$attrs" />
    <span>{{ props.name }}</span>
  </div>
</template>