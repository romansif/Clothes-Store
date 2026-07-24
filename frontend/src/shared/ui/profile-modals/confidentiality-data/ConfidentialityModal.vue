<script setup lang="ts">
import { useProfileModals } from "../../../composables/modals/profile/profileModals.ts";
import { usersStore } from "../../../composables/stores/users.store.ts";

import ProfileForm from "../../../../feature/profile/profile-items/ProfileForm.vue";

const { user } = usersStore();
const { toggleConfidentialityData } = useProfileModals();
</script>

<template>
  <div class="font-[Montserrat] fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
                                flex items-center justify-center py-8 ">
    <div class="flex flex-col bg-white w-[1100px] h-full p-5 rounded-xl">
      <div class="flex flex-col gap-2 border-b pb-4">
        <div class="flex items-center">
          <h1 class="font-bold text-2xl">CONFIDENTIALITY DATA</h1>
          <button @click.stop="toggleConfidentialityData" class="text-start ml-auto h-fit w-fit px-10 py-2 bg-red-500 text-white font-medium
              text-xs rounded-md">
            Exit
          </button>
        </div>
        <span class="text-sm text-[#A3A3A3]">You can view or change your confidential data.</span>
      </div>
      <div class="flex justify-between border-b pb-4">
        <div class="flex flex-col gap-4 mt-4 w-full">
          <div v-if="user.publicPhone" class="flex gap-2 w-84">
            <span class="font-semibold text-lg">Public Phone:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">{{ user.publicPhone }}</span>
          </div>
          <div v-if="!user.publicPhone" class="flex gap-2 w-84">
            <span class="font-semibold text-lg">Private Phone:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">{{ user.privatePhone }}</span>
          </div>
          <div class="flex gap-2">
            <span class="font-semibold text-lg">Email:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">{{ user.email }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-4 mt-4 w-full">
          <div class="flex gap-2">
            <span class="font-semibold text-lg">Company Name:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">{{ user.companyName }}</span>
          </div>
          <div class="flex gap-2">
            <span class="font-semibold text-lg">Current Password:</span>
            <span class="font-medium text-lg text-[#A3A3A3]">••••••••••••</span>
          </div>
        </div>
      </div>
      <ProfileForm />
    </div>
  </div>
</template>

<style scoped>

</style>