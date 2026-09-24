<template>
  <div class="flex flex-col bg-white rounded-xl shadow-2xl">
    <div class="flex p-5">
      <div class="flex items-center gap-10">
        <img v-if="userData"
             :src="userAvatar(userData.avatarUrl)" alt=""
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
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useProfile } from "@/features/use-profile/lib/use-profile.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";
import type {User} from "@/entities/profile/model/user.types.ts";

defineProps<{
  user: User
}>();

import ProfileMenu from "./ProfileMenu.vue";
import OpenProfileModals from "@/widgets/ui/profile/OpenProfileModals.vue";
import ProfileModals from "@/widgets/ui/profile/ProfileModals.vue";

const { userData } = userStore();
const { userAvatar } = useProfile();
const { toggleAvatar } = useProfileModals();
</script>

<style scoped>

</style>