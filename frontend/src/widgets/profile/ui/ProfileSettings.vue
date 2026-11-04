<template>
  <div v-if="props.user" class="flex w-87.5 flex-col rounded-xl bg-white shadow-2xl sm:w-150 md:w-175 lg:w-237.5 xl:w-175">
    <div class="flex p-5">
      <div class="flex items-center gap-10">
        <img
          :src="user ? avatar() : profile"
          alt=""
          class="h-25 w-25 rounded-full bg-white object-cover transition duration-300 group-hover:scale-110"
          @click="toggleAvatar"
        />
        <div class="flex flex-col gap-4 text-xl font-semibold">
          <div class="font-dm-sans flex gap-2">
            <span>{{ t("profile.name") }}</span>
            <span>
              {{ props.user.name }}
            </span>
          </div>
          <div v-if="!props.user.surName" class="flex gap-2">
            <span class="text-sm font-medium opacity-50">{{ t("profile.surnameNotProvided") }}</span>
          </div>
          <div v-else class="font-dm-sans flex gap-2">
            <span>{{ t("profile.surname") }}</span>
            <span>
              {{ props.user.surName }}
            </span>
          </div>
        </div>
      </div>
      <div class="ml-auto flex gap-2">
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
import { useI18n } from "vue-i18n";
import { userAvatar } from "@/widgets/profile/lib/profile-avatar";
import { toggleAvatar } from "@/features/profile-change-avatar/lib/use-profile-modal";
import { OpenProfileModals } from "@/widgets/profile";
import { ProfileModals } from "@/widgets/profile";
import { ProfileMenu } from "@/features/profile-menu";
import type { User } from "@/entities/profile";

import profile from "@/assets/icons/nav/default-avatar.png";

const props = defineProps<{
  user: User;
}>();

const { t } = useI18n();
const { avatar } = userAvatar();
</script>
