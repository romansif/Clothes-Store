<template>
    <div class="flex min-h-screen flex-col bg-[#F0F0F0]">
        <div class="px-4 pt-4 sm:px-4 sm:pt-4 md:px-5 md:pt-5 lg:px-6 lg:pt-6 xl:px-6 xl:pt-6">
            <MainNavBar />
            <router-view />
        </div>
    </div>
    <Transition name="modal">
        <Notification v-if="notify" />
    </Transition>
</template>

<script setup lang="ts">
import { useBaseModals } from "@/shared/lib/use-notify.ts";
import { MainNavBar } from "@/widgets/navigation";
import { Notification } from "@/shared";

const { notify } = useBaseModals();
</script>
