<template>
  <button :class="buttonVariantClasses[props.variant]"
          v-bind="$attrs"
          :type="props.type">
    <slot>{{ props.name }}</slot>
  </button>
</template>

<script setup lang="ts">
import { buttonVariantClasses } from "@/shared/ui/button/button.variants.ts";
import type { ButtonProps } from "@/shared/ui/button/button.types.ts";

const props = withDefaults(defineProps<ButtonProps>(), {
  name: 'base',
  variant: 'login',
  type: 'button',
})
</script>
