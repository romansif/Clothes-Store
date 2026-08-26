<template>
  <div>
    <div @click="toggleConfidentialityData" class="font-raleway fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                  flex items-center justify-center py-14 ">
      <div @click.stop class="flex flex-col bg-white w-275 h-full p-5 rounded-xl">
        <div class="flex flex-col gap-2 border-b pb-4">
          <div class="flex items-center">
            <h1 class="font-bold text-2xl">CONFIDENTIALITY DATA</h1>
            <BaseButton @click="toggleConfidentialityData" name="Exit" variant="exitClose"/>
          </div>
          <span class="text-sm text-[#A3A3A3]">You can view or change your confidential data.</span>
        </div>
        <div class="flex flex-col overflow-y-auto no-scrollbar h-150">
          <ConfidentialityData />
          <ConfidentialityForm />
        </div>
      </div>
    </div>
    <Transition name="notify">
      <Notification v-if="notify" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { notify } = useBaseModals();
const { toggleConfidentialityData } = useProfileModals();

import { useProfileModals } from "@/features/use-profile/lib/profile.modal.ts";
import { useBaseModals } from "@/shared/lib/base.modal.ts";

import ConfidentialityData from "./ConfidentialityData.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
import ConfidentialityForm from "./ConfidentialityForm.vue";
import Notification from "@/shared/ui/Notification.vue";
</script>


<style scoped>

</style>