<template>
  <form action=""
        class="mt-10"
        @submit.prevent="signIn">
    <LoginForm v-if="!showSignSection.signIn" />
    <div class="relative duration-400 hover:scale-105 cursor-pointer">
      <UiButton type="submit"
                  variant="login"
                  name="SIGN IN" />
      <img :src=maki_arrow alt="" class="absolute w-6.25 top-9.5 left-58 sm:left-83">
    </div>
  </form>
  <div class="flex justify-center items-center mt-4 gap-2">
    <span class="border border-[#A3A3A3] w-full"></span>
    <span class="w-67.5">Sign in with</span>
    <span class="border border-[#A3A3A3] w-full"></span>
  </div>
  <div class="flex flex-col items-center gap-3 mt-3">
    <GoogleAuth class="duration-400 hover:scale-105 cursor-pointer"/>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/features/use-auth/api/use-auth";
import { authStore } from "@/features/use-auth/model/auth.store";
import { UiButton } from "@/shared/ui/button";
import { GoogleAuth } from "@/features/use-auth";
import { LoginForm } from "@/features/use-auth";

import maki_arrow from "@/assets/icons/arrows/right-short-arrow.svg";

const { signIn } = useAuth();
const { showSignSection } = authStore();
</script>

<style scoped>

</style>