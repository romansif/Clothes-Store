<template>
  <form action=""
        class="mt-10"
        @submit.prevent="register(currentRole)">
    <RegisterForm />
    <div class="relative duration-400 hover:scale-105 cursor-pointer">
      <UiButton type="submit"
                variant="register"
                :name="isRole ? 'SIGN UP BY SELLER' : 'SIGN UP BY BUYER'" />
      <img :src=maki_arrow alt="" class="absolute w-6.25 top-9.5 left-58 sm:left-118">
    </div>
  </form>
  <div class="flex justify-center mt-3">
    <UiButton variant="changeRegister"
              :name="isRole ? 'Sign up as a buyer' : 'Sign up as a seller'"
              @click="toggleSignUp" />
  </div>
  <Loading v-if="isPending" />
</template>

<script setup lang="ts">
import { signUp } from "@/features/register-auth/api/register";
import { toggleSignUp } from "@/features/register-auth/lib/toggle-role";
import { currentRole, isRole } from "@/features/register-auth/model/register-auth.refs";
import { RegisterForm } from "@/features/register-auth";
import { UiButton } from "@/shared/ui/button";
import { Loading } from "@/widgets/state";

import maki_arrow from "@/assets/icons/arrows/right-short-arrow.svg";

const { register, isPending } = signUp()
</script>
