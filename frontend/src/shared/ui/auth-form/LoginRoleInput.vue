<template>
    <div :class="[signInRoleClass, props.errorMessage ? signInRoleErrorClass : '']">
        <input
            v-model="model"
            :value="props.role"
            type="radio"
            name="role"
            class="h-4 w-4 cursor-pointer accent-black"
        />
        <span class="font-semibold">
            {{ role }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { signInRoleClass, signInRoleErrorClass } from "@/shared/ui/auth-form/auth-form.variants";
import type { AuthFormProps } from "@/shared/ui/auth-form";

const props = defineProps<AuthFormProps>();

const model = defineModel<string | number>();
</script>

<style scoped></style>
