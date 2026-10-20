<template>
  <div :class="props.errorMessage ? signInRole.error : signInRole.default">
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
import { signInRole } from "@/shared/ui/auth/auth-form.variants.ts";
import type {AuthFormProps} from "@/shared/ui/auth/auth-form.types.ts";

const props = defineProps<AuthFormProps>()

const model = defineModel<string | number>();
</script>

<style scoped>

</style>