<template>
  <div class="min-h-screen bg-[#F0F0F0]">
    <MainNavBar />
    <div class="font-raleway p-4 md:p-5 lg:p-6">
      <router-view />
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import { MainNavBar } from "@/widgets/navigation";
import { Footer } from "@/widgets/footer";
</script>
