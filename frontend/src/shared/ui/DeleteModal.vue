<template>
  <div @click="toggleDeleteChoice('', '', '')" class="font-[Montserrat] fixed inset-0 z-50
      bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
    <div  @click.stop class="flex justify-center items-center w-100 h-50 bg-white rounded-md py-2 text-lg">
      <div class="flex flex-col items-center gap-8">
        <h1 class="text-center w-60 font-medium">{{ deleteMessage }}</h1>
        <div class="flex gap-10">
          <BaseButton @click="toggleDeleteChoice" name="Cancel" variant="cancel" />
          <BaseButton @click="generalDelete" name="Confirm" variant="confirm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { toggleDeleteChoice, generalDelete, deleteMessage } = useProfileModals();

import { useProfileModals } from "@/feature/profile/lib/profile.modal.ts";

import BaseButton from "@/shared/ui/BaseButton.vue";
</script>

<style scoped>

</style>