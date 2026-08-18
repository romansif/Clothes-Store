<script setup lang="ts">
import { useProfileModals } from "@/shared/composables/modals/profile.modals.ts";

import BaseButton from "@/shared/ui/base/button/BaseButton.vue";

const { toggleDeleteChoice, generalDelete, deleteMessage } = useProfileModals();
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center">
    <div class="flex justify-center items-center w-100 h-[2h-50white rounded-md py-2 text-lg">
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

<style scoped>

</style>