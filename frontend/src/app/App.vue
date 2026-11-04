<script setup lang="ts">
import { useBaseModals } from "@/widgets/notification/lib/use-notify";
import { Notification } from "@/widgets/notification";
import { Footer } from "@/widgets/footer";

const { notify } = useBaseModals();
</script>

<template>
  <router-view />
  <Transition name="notify">
    <Notification v-if="notify" />
  </Transition>
  <Footer />
</template>

<style>
::selection {
  background-color: #3b3c36;
  color: #ffffff;
}
</style>
