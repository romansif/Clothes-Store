<script setup lang="ts">
import { auth } from "@/feature/auth/auth-composables/auth.ts";
import { clearAuthForms } from "@/shared/composables/clear-forms/clear.auth.ts";
import { toggleAuth } from "@/feature/auth/auth-composables/toggleAuth.ts";
import { useBaseModals } from "@/shared/composables/modals/base.modals";
import { authStore } from "@/shared/composables/stores/auth.store.ts";

import SignUpBuyer from "@/feature/auth/signUp/SignUpBuyer.vue";
import SignUpSeller from "@/feature/auth/signUp/SignUpSeller.vue";
import Loading from "@/shared/ui/base/base-modals/Loading.vue";
import Notification from "@/shared/ui/base/base-modals/Notification.vue";
import maki_arrow from "@/app/assets/icons/arrows/right-short-arrow.svg";
import BaseButton from "@/shared/ui/base/button/BaseButton.vue";

const { signUp } = auth();
const { toggleSignUp } = toggleAuth();
const { showSignSection } = authStore();
const { loading, notify } = useBaseModals();
const { clearRegisterForm } = clearAuthForms();
</script>

<template>
  <div class='fixed font-[Montserrat] inset-0 flex items-center justify-center'>
    <div class="w-87.5 sm:w-150 rounded-lg px-8 py-8">
      <div class="flex items-center justify-center">
        <div class="w-58.75 sm:w-75">
          <div class="font-medium flex items-center justify-between">
            <router-link :to="{name: 'signIn'}" @click=clearRegisterForm>
              <span class="text-[#A3A3A3]">SIGN IN</span>
            </router-link>
            <span class="">SIGN UP</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-10 font-bold text-3xl w-55 transition duration-400 hover:scale-110">
        <span>WELCOME TO</span>
        <span class="text-[#A3A3A3]">THE STORE</span>
      </div>
      <SignUpBuyer v-if="!showSignSection.signUp" />
      <SignUpSeller v-if="showSignSection.signUp" />
      <div class="flex flex-col gap-3">
        <div class="relative duration-400 hover:scale-105 cursor-pointer">
          <BaseButton @click="signUp('Buyer')" name="SIGN UP BY BUYER" variant="register" />
          <img :src=maki_arrow alt="" class="absolute w-6.25 top-9.5 left-58 sm:left-121">
        </div>
        <BaseButton @click="toggleSignUp" name="Sign up as a seller" variant="changeRegister" />
      </div>
    </div>
  </div>
  <Loading v-if="loading"/>
  <Transition name="notify">
    <Notification v-if="notify"/>
  </Transition>
</template>

<style scoped>

</style>