<template>
  <div>
    <div class="font-raleway fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
         flex items-center justify-center py-14"
         @click="toggleConfidentialityData">
      <div @click.stop class="flex flex-col bg-white w-275 h-full p-5 rounded-xl">
        <div class="flex flex-col gap-2 border-b pb-4">
          <div class="flex items-center">
            <h1 class="font-bold text-2xl">CONFIDENTIALITY DATA</h1>
            <UiButton name="Exit"
                        variant="exitClose"
                        @click="toggleConfidentialityData" />
          </div>
          <span class="text-sm text-[#A3A3A3]">You can view or change your confidential data.</span>
        </div>
        <div class="flex flex-col overflow-y-auto no-scrollbar h-150">
          <div class="flex gap-10 font-semibold text-lg font-dm-sans">
            <ConfidentialityData :user="user"/>
          </div>
          <div class="flex font-medium flex-col gap-5 pt-5">
            <UpdateProfileForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserData } from "@/widgets/profile/lib/use-user-data";
import { useProfileModals } from "@/shared/lib/profile-modal";
import { UiButton } from "@/shared/ui/button";
import { ConfidentialityData } from "@/entities/profile";
import { UpdateProfileForm } from "@/features/change-user-data-from";

const { user } = useUserData()
const { toggleConfidentialityData } = useProfileModals();
</script>
