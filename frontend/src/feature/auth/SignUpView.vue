<template>
  <div class='fixed font-[Montserrat] inset-0 flex items-center justify-center'>
    <div class="w-87.5 sm:w-150 rounded-lg px-8 py-8">
      <div class="flex items-center justify-center">
        <div class="w-58.75 sm:w-75">
          <div class="font-medium flex items-center justify-between">
            <router-link :to="{name: 'signIn'}" @click=clearRegisterForm class="transition duration-400 hover:scale-120">
              <span class="text-[#A3A3A3]">SIGN IN</span>
            </router-link>
            <span class="cursor-pointer transition duration-400 hover:scale-120">SIGN UP</span>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-10 font-bold text-3xl w-55 transition duration-400 hover:scale-110">
        <span>WELCOME TO</span>
        <span class="text-[#A3A3A3]">THE NOIR</span>
      </div>
      <BuyerRegisterForm v-if="!showSignSection.signUp" />
      <SellerRegisterForm v-if="showSignSection.signUp" />
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

<script setup lang="ts">
import { authApi } from "@/feature/auth/api/auth.api.ts";
import { clearAuthForms } from "@/feature/auth/lib/clear.auth.ts";
import { useAuth } from "@/feature/auth/lib/use-auth.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";
import { authStore } from "@/feature/auth/model/auth.store.ts";

import BuyerRegisterForm from "@/feature/auth/ui/BuyerRegisterForm.vue";
import SellerRegisterForm from "@/feature/auth/ui/SellerRegisterForm.vue";
import Loading from "@/shared/ui/Loading.vue";
import Notification from "@/shared/ui/Notification.vue";
import maki_arrow from "@/assets/icons/arrows/right-short-arrow.svg";
import BaseButton from "@/shared/ui/BaseButton.vue";

const { signUp } = authApi();
const { toggleSignUp } = useAuth();
const { showSignSection } = authStore();
const { loading, notify } = useBaseModals();
const { clearRegisterForm } = clearAuthForms();
</script>

<style scoped>

</style>