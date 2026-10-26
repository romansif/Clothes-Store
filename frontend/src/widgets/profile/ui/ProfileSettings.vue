<template>
  <div v-if="userData" class="flex flex-col bg-white rounded-xl shadow-2xl">
    <div class="flex p-5">
      <div class="flex items-center gap-10">
        <img :src="userAvatar(userData.avatarUrl)" alt=""
             class="rounded-full w-25 transition duration-400 hover:scale-108"
             @click="toggleAvatar">
        <div class="flex flex-col gap-4 font-semibold text-xl">
          <div class="flex gap-2 font-dm-sans">
            <span>Name:</span>
            <span>
              {{ userData.name }}
            </span>
          </div>
          <div v-if="!userData.surName" class="flex gap-2">
            <span class="font-medium text-sm opacity-50">
              Surname not provided
            </span>
          </div>
          <div v-else class="flex gap-2 font-dm-sans">
            <span>Surname:</span>
            <span>
              {{ userData.surName }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex gap-2 ml-auto">
        <ProfileMenu />
      </div>
    </div>
    <div class="flex flex-col border-t border-gray-300 font-medium">
      <OpenProfileModals :user="userData" />
    </div>
  </div>
  <ProfileModals />
</template>

<script setup lang="ts">
import { userData } from "@/shared/model/user.store";
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { toggleAvatar } from "@/features/profile-change-avatar/lib/use-profile-modal";
import { OpenProfileModals } from "@/widgets/profile";
import { ProfileModals } from "@/widgets/profile";
import { ProfileMenu } from "@/features/profile-menu";
</script>
