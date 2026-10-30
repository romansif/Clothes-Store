<template>
    <Loading v-if="isPending" />
    <form action="" class="mt-10" @submit.prevent="login()">
        <LoginForm v-if="!showSignSection.signIn" />
        <div class="relative cursor-pointer duration-400 hover:scale-105">
            <UiButton type="submit" variant="login" name="SIGN IN" />
            <img :src="maki_arrow" alt="" class="absolute top-9.5 left-58 w-6.25 sm:left-83" />
        </div>
    </form>
    <div class="mt-4 flex items-center justify-center gap-2">
        <span class="w-full border border-[#A3A3A3]"></span>
        <span class="w-67.5">Sign in with</span>
        <span class="w-full border border-[#A3A3A3]"></span>
    </div>
    <div class="mt-3 flex flex-col items-center gap-3">
      <GoogleAuth />
    </div>
</template>

<script setup lang="ts">
import { signIn } from "@/features/login-auth/api/login";
import { showSignSection } from "@/features/login-auth/model/login-auth.refs";
import { GoogleAuth } from "@/features/login-by-google";
import { UiButton } from "@/shared/ui/button";
import { LoginForm } from "@/features/login-auth";
import { Loading } from "@/widgets/state";

import maki_arrow from "@/assets/icons/arrows/right-short-arrow.svg";

const { login, isPending } = signIn();
</script>
