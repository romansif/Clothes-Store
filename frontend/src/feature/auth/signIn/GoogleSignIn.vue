<script setup lang="ts">
import { onMounted } from "vue";
import { auth } from "@/feature/auth/auth-composables/auth.ts";

const { signOAuth } = auth();

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: signOAuth,
  });

  window.google.accounts.id.renderButton(
      document.getElementById("google-button")!,
      {
        type: "icon",
        size: "large",
        shape: "rectangular",
        width: 385
      }
  );
});
</script>

<template>
  <div id="google-button"></div>
</template>