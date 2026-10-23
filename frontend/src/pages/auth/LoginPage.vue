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
import { signIn } from "@/features/login-auth/api/login";
import { showSignSection } from "@/features/login-auth/model/login-auth.refs";
import { GoogleAuth } from "@/features/login-by-google";
import { UiButton } from "@/shared/ui/button";
import { LoginForm } from "@/features/login-auth";

import maki_arrow from "@/assets/icons/arrows/right-short-arrow.svg";
</script>
