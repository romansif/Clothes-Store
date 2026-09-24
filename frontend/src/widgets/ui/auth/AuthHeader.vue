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
import { computed } from "vue";
import { useRoute } from "vue-router";
import { clearAuthForms } from "@/features/use-auth/lib/clear-auth.ts";

const route = useRoute();

const { clearLoginForm, clearRegisterForm } = clearAuthForms();

const isLogin = computed(() => route.name === "signIn");
const isRegister = computed(() => route.name === "signUp");
</script>

<style scoped>

</style>