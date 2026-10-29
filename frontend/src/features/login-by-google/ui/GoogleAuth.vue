<template>
    <Loading v-if="isPending" />
    <div id="google-button"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { signGoogleAuth } from "@/features/login-by-google/api/use-google-auth";
import { Loading } from "@/widgets/state";

const { OAuth, isPending } = signGoogleAuth();

onMounted(() => {
    window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: OAuth,
    });

    window.google.accounts.id.renderButton(document.getElementById("google-button")!, {
        type: "icon",
        size: "large",
        shape: "rectangular",
        width: 385,
    });
});
</script>
