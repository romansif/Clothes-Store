<template>
  <div class="bg-white h-screen">
    <main class="font-raleway fixed inset-0 flex items-center justify-center">
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
          <img :src=maki_arrow alt="" class="absolute w-6.25 top-9.5 left-58 sm:left-83 ">
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
    </main>
    <Loading v-if="loading"/>
    <Transition name="notify">
      <Notification v-if="notify"/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { signIn } = authApi();
const { showSignSection } = authStore();
const { loading, notify } = useBaseModals();
const { clearLoginForm } = clearAuthForms();

import { authApi } from "@/features/use-auth/api/auth.api.ts";
import { clearAuthForms } from "@/features/use-auth/lib/clear.auth.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { authStore } from "@/entities/auth/model/auth.store.ts";

import Loading from "@/widgets/Loading.vue";
import Notification from "@/shared/ui/Notification.vue";
import LoginForm from "@/entities/auth/ui/LoginForm.vue";
import PhoneSignIn from "@/entities/auth/ui/PhoneSignIn.vue";
import maki_arrow from "@/assets/icons/arrows/right-short-arrow.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";
import GoogleSignIn from "@/entities/auth/ui/GoogleSignIn.vue";
import ReCaptcha from "@/entities/auth/ui/ReCaptcha.vue";
</script>

<style scoped>

</style>