<template>
  <div :class="signInRoleClass">
    <input v-model="loginForm.role"
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
import { loginForm } from "@/features/use-auth/model/auth.forms.ts";

defineProps<{
  role: string;
}>();

const { signInRoleClass } = authClasses();
</script>

<style scoped>

</style>