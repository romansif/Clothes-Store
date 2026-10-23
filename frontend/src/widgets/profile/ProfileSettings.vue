<template>
  <div class="flex flex-col bg-white rounded-xl shadow-2xl">
    <div class="flex p-5">
      <div class="flex items-center gap-10">
        <img v-if="userData" :src="userAvatar(userData.avatarUrl)" alt=""
             class="rounded-full w-25 transition duration-400 hover:scale-108"
             @click="toggleAvatar">
        <div class="flex flex-col gap-4 font-semibold text-xl">
          <div class="flex gap-2 font-dm-sans">
            <span>Name:</span>
            <span>
              {{ user.name }}
            </span>
          </div>
          <div v-if="!user.surName" class="flex gap-2">
            <span class="font-medium text-sm opacity-50">
              Surname not provided
            </span>
          </div>
          <div v-else class="flex gap-2 font-dm-sans">
            <span>Surname:</span>
            <span>
              {{ user.surName }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex gap-2 ml-auto">
        <ProfileMenu />
      </div>
    </div>
    <div class="flex flex-col border-t border-gray-300 font-medium">
      <OpenProfileModals :user="user" />
    </div>
  </div>
  <ProfileModals />
</template>

<script setup lang="ts">
import { userStore } from "@/shared/model/user.store";
import { userAvatar } from "@/features/use-profile/lib/use-profile";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal";
import { OpenProfileModals } from "@/widgets/profile/index";
import { ProfileModals } from "@/widgets/profile/index";
import { ProfileMenu } from "@/features/profile-menu";
import type { User } from "@/entities/profile";

defineProps<{
  user: User
}>();

const { userData } = userStore();
const { toggleAvatar } = useProfileModals();
</script>
