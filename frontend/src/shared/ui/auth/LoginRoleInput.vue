<template>
  <div :class="signInRoleClass(errorMessage)">
    <input v-model="model"
           :value="role"
           type="radio"
           name="role"
           class="accent-black w-4 h-4 cursor-pointer">
    <span class="font-semibold">
      {{ role }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { authClasses } from "@/shared/const/auth/auth.classes.ts";

defineProps<{
  role: string;
  errorMessage: string;
}>();

const model = defineModel<string | number>();

const { signInRoleClass } = authClasses();
</script>

<style scoped>

</style>