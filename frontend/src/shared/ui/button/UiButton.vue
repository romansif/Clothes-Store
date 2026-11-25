<template>
  <button :class="BUTTON_VARIANT_CLASSES[props.variant]" v-bind="$attrs" :type="props.type">
    <slot>{{ props.name }}</slot>
  </button>
</template>

<script setup lang="ts">
import { BUTTON_VARIANT_CLASSES } from "@/shared/ui/button/button.variants";
import type { ButtonProps } from "@/shared/ui/button";

const props = withDefaults(defineProps<ButtonProps>(), {
  name: "base",
  variant: "login",
  type: "button",
});
</script>
