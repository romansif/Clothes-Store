<script setup lang="ts">
import { useBaseModals } from "@/shared/ui/notification";
import { Notification } from "@/shared/ui/notification";

const { notify } = useBaseModals();
</script>

<template>
  <router-view />
  <Transition name="notify">
    <Notification v-if="notify" />
  </Transition>
</template>

<style>
::selection {
  background-color: #3b3c36;
  color: #ffffff;
}
</style>
