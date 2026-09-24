<template>
  <div @click="toggleDeleteChoice('', '', '')"
       class="font-montserrat fixed inset-0 z-50
      bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
    <div @click.stop class="flex justify-center items-center w-100 h-50 bg-white rounded-md py-2 text-lg">
      <div class="flex flex-col items-center gap-8">
        <h1 class="text-center w-60 font-medium">{{ deleteMessage }}</h1>
        <div class="flex gap-10">
          <BaseButton name="Cancel"
                      variant="cancel"
                      @click="toggleDeleteChoice" />
          <BaseButton name="Confirm"
                      variant="confirm"
                      @click="generalDelete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { baseDeleteModal } from "@/features/use-general-delete/lib/base-delete-modal.ts";

import BaseButton from "@/shared/ui/base/BaseButton.vue";

const { toggleDeleteChoice, generalDelete, deleteMessage } = baseDeleteModal();
</script>

<style scoped>

</style>