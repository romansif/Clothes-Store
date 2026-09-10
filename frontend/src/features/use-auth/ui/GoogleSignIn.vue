<template>
  <div id="google-button"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuth } from "@/features/use-auth/api/use-auth.ts";

const { signOAuth } = useAuth();

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
