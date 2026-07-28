<script setup lang="ts">
import { useProfileModals } from "../../../composables/modals/profile/profileModals.ts";

import ConfidentialityForm from "./ConfidentialityForm.vue";
import UserData from "./UserData.vue";
import BaseButton from "../../button/BaseButton.vue";

const { toggleConfidentialityData } = useProfileModals();
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center py-14 ">
    <div class="flex flex-col bg-white w-[1100px] h-full p-5 rounded-xl">
      <div class="flex flex-col gap-2 border-b pb-4">
        <div class="flex items-center">
          <h1 class="font-bold text-2xl">CONFIDENTIALITY DATA</h1>
          <BaseButton @click.stop="toggleConfidentialityData" name="Exit" variant="exitClose"/>
        </div>
        <span class="text-sm text-[#A3A3A3]">You can view or change your confidential data.</span>
      </div>
      <div class="flex flex-col overflow-y-auto no-scrollbar h-[600px]">
        <UserData />
        <ConfidentialityForm />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>