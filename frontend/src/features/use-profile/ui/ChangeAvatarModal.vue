<template>
  <div class="font-raleway fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)]
       flex items-center justify-center"
       @click="toggleAvatar">
    <div @click.stop class="bg-white rounded-2xl w-112.5 shadow-xl">
      <div class="flex flex-col justify-center py-8 gap-6">
        <h2 class="text-2xl text-center font-bold">Click on the avatar to change</h2>
        <div class="flex flex-col items-center gap-6">
          <img v-if="userData"
               :src="userAvatar(userData.avatarUrl)" alt=""
               class="w-35 rounded-full transition duration-400 hover:scale-110"
               @click="openSelectAvatar" />
          <div class="flex gap-12">
            <BaseButton name="Confirm"
                        variant="toggleAvatar"
                        @click="toggleAvatar" />
          </div>
          <input type="file" @change="updateAvatarAccount"
                 class="hidden"
                 :ref="(el) => { fileInput = el as HTMLInputElement }" accept="image/*">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "@/features/use-profile/model/user.store.ts";
import { useProfile } from "@/features/use-profile/lib/use-profile.ts";
import { useProfileModals } from "@/features/use-profile/lib/profile-modal.ts";
import { profileApi } from "@/features/use-profile-form/api/profile.api.ts";

import BaseButton from "@/shared/ui/base/BaseButton.vue";

const { userData } = userStore();
const { userAvatar } = useProfile();
const { updateAvatarAccount } = profileApi();
const { toggleAvatar, openSelectAvatar, fileInput } = useProfileModals();
</script>

<style scoped>

</style>