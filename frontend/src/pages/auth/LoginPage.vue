<template>
  <div class="w-87.5 sm:w-md rounded-lg px-8 py-8">
    <div class="flex items-center justify-center">
      <div class="w-58.75 sm:w-68.75">
        <div class="font-medium flex items-center justify-between">
          <span class="cursor-pointer transition duration-400 hover:scale-120">SIGN IN</span>
          <router-link :to="{ name: 'signUp'}" @click="clearLoginForm" class="transition duration-400 hover:scale-110">
            <span class="text-[#A3A3A3]">SIGN UP</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-10 font-bold text-3xl w-55 transition duration-400 hover:scale-110">
      <span>WELCOME TO</span>
      <span class="text-[#A3A3A3]">THE NOIR</span>
    </div>
    <LoginForm v-if="!showSignSection.signIn" />
    <PhoneSignIn v-if="showSignSection.signIn" />
    <ReCaptcha />
    <div class="relative duration-400 hover:scale-105 cursor-pointer">
      <BaseButton @click="signIn" name="SIGN IN" variant="login" />
      <img :src=maki_arrow alt="" class="absolute w-6.25 top-9.5 left-58 sm:left-83">
    </div>
    <div class="flex justify-center items-center mt-6 gap-2">
      <span class="border border-[#A3A3A3] w-full"></span>
      <span class="w-67.5">Sign in with</span>
      <span class="border border-[#A3A3A3] w-full"></span>
    </div>
    <div class="flex flex-col items-center gap-3 mt-3">
      <GoogleSignIn class="duration-400 hover:scale-105 cursor-pointer"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/features/use-auth/api/use-auth.ts";
import { clearAuthForms } from "@/features/use-auth/lib/clear.auth.ts";
import { authStore } from "@/features/use-auth/model/auth.store.ts";

import LoginForm from "@/features/use-auth/ui/LoginForm.vue";
import PhoneSignIn from "@/features/use-auth/ui/PhoneSignIn.vue";
import maki_arrow from "@/assets/icons/arrows/right-short-arrow.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import GoogleSignIn from "@/features/use-auth/ui/GoogleSignIn.vue";
import ReCaptcha from "@/features/use-auth/ui/ReCaptcha.vue";

const { signIn } = useAuth();
const { showSignSection } = authStore();
const { clearLoginForm } = clearAuthForms();
</script>

<style scoped>

</style>