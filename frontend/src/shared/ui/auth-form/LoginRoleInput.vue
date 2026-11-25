<template>
  <div :class="[SIGN_IN_ROLE_CLASS, props.errorMessage ? SIGN_IN_ROLE_ERROR_CLASS : '']">
    <input v-model="model" type="radio" name="role" class="h-4 w-4 cursor-pointer accent-black" v-bind="$attrs" />
    <span class="font-semibold">
      {{ props.role }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { SIGN_IN_ROLE_CLASS, SIGN_IN_ROLE_ERROR_CLASS } from "@/shared/ui/auth-form/auth-form.variants";
import type { AuthFormProps } from "@/shared/ui/auth-form";

const props = defineProps<AuthFormProps>();

const model = defineModel<string | number>();
</script>
