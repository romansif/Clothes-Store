<template>
  <form action=""
        class="mt-10"
        @submit.prevent="signUp(currentRole)">
    <RegisterForm />
    <div class="relative duration-400 hover:scale-105 cursor-pointer">
      <UiButton type="submit"
                  variant="register"
                  :name="isRole ? 'SIGN UP BY SELLER' : 'SIGN UP BY BUYER'" />
      <img :src=maki_arrow alt="" class="absolute w-6.25 top-9.5 left-58 sm:left-118">
    </div>
  </form>
  <div class="flex justify-center mt-3">
    <UiButton @click="toggleSignUp"
                variant="changeRegister"
                :name="isRole ? 'Sign up as a buyer' : 'Sign up as a seller'" />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/features/use-auth/api/use-auth";
import { toggleAuth } from "@/features/use-auth/lib/toggle-auth";
import { authStore } from "@/features/use-auth/model/auth.store";
import { RegisterForm } from "@/features/use-auth";
import { UiButton } from "@/shared/ui/button";

import maki_arrow from "@/assets/icons/arrows/right-short-arrow.svg";

const { signUp } = useAuth();
const { toggleSignUp } = toggleAuth();
const { currentRole, isRole } = authStore();
</script>

<style scoped>

</style>