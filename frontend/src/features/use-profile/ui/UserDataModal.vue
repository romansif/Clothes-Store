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
          <div class="flex gap-10 font-semibold text-lg font-dm-sans">
            <ConfidentialityData :user="userData"/>
          </div>
          <div class="flex font-medium flex-col gap-5 pt-5">
            <UpdateProfileForm />
          </div>
        </div>
      </div>
    </div>
    <Transition name="notify">
      <Notification v-if="notify" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useBaseModals } from "@/shared/lib/base-modal.ts";

import ConfidentialityData from "../../../entities/profile/ui/ConfidentialityData.vue";
import BaseButton from "@/shared/ui/BaseButton.vue";
import UpdateProfileForm from "../../use-profile-form/ui/UpdateProfileForm.vue";
import Notification from "@/shared/ui/Notification.vue";

const { userData } = userStore();
const { notify } = useBaseModals();
const { toggleConfidentialityData } = useProfileModals();
</script>


<style scoped>

</style>