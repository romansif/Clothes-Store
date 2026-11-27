<template>
  <div class="flex min-h-screen flex-col bg-black text-white font-montserrat">
    <InfoNavBar />
    <main class="flex-1">
      <router-view />
    </main>
    <InfoFooter />
  </div>
</template>

<script setup lang="ts">
import { InfoNavBar } from "@/widgets/navigation";
import { InfoFooter } from "@/widgets/footer";
</script>
