<template>
  <div :class="[signInRole.default, props.errorMessage ? signInRole.error : '']">
    <input v-model="model"
           :value="props.role"
           type="radio"
           name="role"
           class="accent-black w-4 h-4 cursor-pointer">
    <span class="font-semibold">
      {{ role }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { signInRole } from "@/shared/ui/auth-form/auth-form.variants";
import type { AuthFormProps } from "@/shared/ui/auth-form";

const props = defineProps<AuthFormProps>()

const model = defineModel<string | number>();
</script>

<style scoped>

</style>