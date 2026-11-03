<template>
  <div class="flex items-center justify-between font-medium">
    <router-link :to="{ name: 'signIn' }" class="transition duration-400 hover:scale-120" @click="clearRegisterForm">
      <span :class="[isLogin ? 'text-black' : 'text-[#A3A3A3]']">{{ t("auth.signIn") }}</span>
    </router-link>
    <router-link :to="{ name: 'signUp' }" class="transition duration-400 hover:scale-110" @click="clearLoginForm">
      <span :class="[isRegister ? 'text-black' : 'text-[#A3A3A3]']">{{ t("auth.signUp") }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useAuthHeader } from "@/widgets/auth-header/lib/use-auth-header";
import { clearLoginForm } from "@/features/login-auth/lib/clear-login-form";
import { clearRegisterForm } from "@/features/register-auth/lib/clear-register-form";

const route = useRoute();

const { t } = useI18n();
const { isLogin, isRegister } = useAuthHeader(route);
</script>
