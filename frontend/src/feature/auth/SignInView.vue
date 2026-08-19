<template>
  <div class="font-[Montserrat] fixed inset-0 flex items-center justify-center">
    <div class="w-87.5 sm:w-md rounded-lg px-8 py-8">
      <div class="flex items-center justify-center">
        <div class="w-58.75 sm:w-68.75">
          <div class="font-medium flex items-center justify-between">
            <span class="cursor-pointer transition duration-400 hover:scale-120">SIGN IN</span>
            <router-link :to="{ name: 'signUp'}" @click=clearLoginForm class="transition duration-400 hover:scale-110">
              <span class="text-[#A3A3A3]">SIGN UP</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-10 font-bold text-3xl w-55 transition duration-400 hover:scale-110">
        <span>WELCOME TO</span>
        <span class="text-[#A3A3A3]">THE NOIR</span>
      </div>
      <SignIn v-if="!showSignSection.signIn" />
      <SignInWithPhone v-if="showSignSection.signIn" />
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
  </div>
  <Loading v-if="loading"/>
  <Transition name="notify">
    <Notification v-if="notify"/>
  </Transition>
</template>

<script setup lang="ts">
import { auth } from "@/feature/auth/auth-actions/auth.ts";
import { clearAuthForms } from "@/shared/composables/clear-forms/clear.auth.ts";
import { useBaseModals } from "@/shared/composables/modals/base.modals.ts";
import { authStore } from "@/shared/composables/stores/auth.store.ts";

import Loading from "@/shared/ui/base/base-modals/Loading.vue";
import Notification from "@/shared/ui/base/base-modals/Notification.vue";
import SignIn from "@/feature/auth/signIn/SignIn.vue";
import SignInWithPhone from "@/feature/auth/signIn/SignInWithPhone.vue";
import maki_arrow from "@/app/assets/icons/arrows/right-short-arrow.svg";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";
import GoogleSignIn from "@/feature/auth/signIn/GoogleSignIn.vue";
import ReCaptcha from "@/feature/auth/auth-middleware/ReCaptcha.vue";

const { signIn } = auth();
const { showSignSection } = authStore();
const { loading, notify } = useBaseModals();
const { clearLoginForm } = clearAuthForms();
</script>

<style scoped>

</style>