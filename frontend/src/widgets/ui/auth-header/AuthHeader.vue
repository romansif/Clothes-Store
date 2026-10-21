<template>
  <div class="font-medium flex items-center justify-between">
    <router-link :to="{name: 'signIn'}"
                 class="transition duration-400 hover:scale-120"
                 @click="clearRegisterForm">
      <span :class="[isLogin ? 'text-black' : 'text-[#A3A3A3]']">SIGN IN</span>
    </router-link>
    <router-link :to="{ name: 'signUp'}"
                 class="transition duration-400 hover:scale-110"
                 @click="clearLoginForm">
      <span :class="[isRegister ? 'text-black' : 'text-[#A3A3A3]']">SIGN UP</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { clearAuthForms } from "@/features/use-auth/lib/clear-auth.ts";
import { useAuthHeader } from "@/widgets/lib/use-auth-header.ts";

const route = useRoute();

const { isLogin, isRegister} = useAuthHeader(route)
const { clearLoginForm, clearRegisterForm } = clearAuthForms();
</script>
