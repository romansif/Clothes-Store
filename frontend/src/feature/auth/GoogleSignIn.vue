<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "@/feature/auth/auth-composables/use.auth.ts";


const { signOAuth } = useAuth()

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: signOAuth,
  });

  window.google.accounts.id.renderButton(
      document.getElementById("google-button")!,
      {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "signin_with",
      }
  );
});
</script>

<template>
  <div id="google-button"></div>
</template>