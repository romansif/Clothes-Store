<template>
    <div class="min-h-screen bg-white">
        <main class="font-raleway fixed inset-0 flex items-center justify-center">
            <div :class="['rounded-lg px-4 py-8', isLogin ? 'w-105' : 'w-87.5 sm:w-140']">
                <div class="flex items-center justify-center">
                    <div class="w-58.75 sm:w-68.75">
                        <AuthHeader />
                    </div>
                </div>
                <div
                    class="mt-10 flex w-55 flex-col text-3xl font-bold transition duration-400 hover:scale-110"
                >
                    <span>WELCOME TO</span>
                    <span class="text-[#A3A3A3]">THE NOIR</span>
                </div>
                <router-view />
            </div>
        </main>
        <Transition name="modal">
            <Notification v-if="notify" />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useBaseModals } from "@/shared/lib/use-notify";
import { AuthHeader } from "@/widgets/auth-header";
import { Notification } from "@/shared";

const route = useRoute();

const { notify } = useBaseModals();

const isLogin = computed(() => route.name === "signIn");
</script>
