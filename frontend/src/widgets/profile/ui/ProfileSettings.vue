<template>
  <div v-if="props.user" class="flex flex-col bg-white rounded-xl shadow-2xl">
    <div class="flex p-5">
      <div class="flex items-center gap-10">
        <img :src="avatar()" alt=""
             class="rounded-full w-25 transition duration-400 hover:scale-108"
             @click="toggleAvatar">
        <div class="flex flex-col gap-4 font-semibold text-xl">
          <div class="flex gap-2 font-dm-sans">
            <span>Name:</span>
            <span>
              {{ props.user.name }}
            </span>
          </div>
          <div v-if="!props.user.surName" class="flex gap-2">
            <span class="font-medium text-sm opacity-50">
              Surname not provided
            </span>
          </div>
          <div v-else class="flex gap-2 font-dm-sans">
            <span>Surname:</span>
            <span>
              {{ props.user.surName }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex gap-2 ml-auto">
        <ProfileMenu :user="user" />
      </div>
    </div>
    <div class="flex flex-col border-t border-gray-300 font-medium">
      <OpenProfileModals :user="props.user" />
    </div>
  </div>
  <ProfileModals />
</template>

<script setup lang="ts">
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { toggleAvatar } from "@/features/profile-change-avatar/lib/use-profile-modal";
import { OpenProfileModals } from "@/widgets/profile";
import { ProfileModals } from "@/widgets/profile";
import { ProfileMenu } from "@/features/profile-menu";
import type { User } from "@/entities/profile";

const props = defineProps<{
  user: User
}>()

const { avatar } = userAvatar()
</script>
