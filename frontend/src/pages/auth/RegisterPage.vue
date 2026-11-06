<template>
  <Loading v-if="isPending" />
  <form action="" class="mt-10" @submit.prevent="register(currentRole)">
    <RegisterForm />
    <div class="relative cursor-pointer duration-400 hover:scale-105">
      <UiButton type="submit" variant="register" :name="isRole ? t('auth.signUpBuyer') : t('auth.signUpSeller')" />
      <img :src="maki_arrow" alt="" class="absolute top-9.5 left-58 w-6.25 sm:left-118" />
    </div>
  </form>
  <div class="mt-3 flex justify-center">
    <UiButton
      variant="changeRegister"
      :name="isRole ? t('auth.signUpAsBuyer') : t('auth.signUpAsSeller')"
      @click="toggleSignUp"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { signUp } from "@/features/register-auth/api/register";
import { toggleSignUp } from "@/features/register-auth/lib/toggle-role";
import { currentRole, isRole } from "@/features/register-auth/model/register-auth.refs";
import { RegisterForm } from "@/features/register-auth";
import { UiButton } from "@/shared/ui/button";
import { Loading } from "@/widgets/state";

import maki_arrow from "@/assets/icons/arrows/right-short-arrow.svg";

const { t } = useI18n();
const { register, isPending } = signUp();
</script>
